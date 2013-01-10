#' Links two tables using the information given in the list \code{link}.
#'
#' @param link a link specifying which tables and how the tables should be 
#'   linked. The format will/should be described elseware.
#'
#' @return The name of the newly created table.
#'
#' @export
#'
link_tables <- function(link) {
  #TODO add meta data for sliced dimension!!!
  
  # Read all necessary data
  t1 <- get_table(link$table1)
  t1_meta <- t1$meta
  t1      <- t1$data
  t2      <- get_table(link$table2)
  t2_meta <- t2$meta
  t2      <- t2$data

  #save(link, t1, t1_meta, t2, t2_meta, file="link.RData")
  #load("rook/link.RData")
  # Initialise list with meta for dimensions and variables
  meta <- list(
    name = link$newtable,
    description = paste0("Table created by linking the tables '", 
      t1_meta$name, "' and '", t2_meta$name, "'."),
    dimensions = list(),
    variables = list(),
    populations = c(t1_meta$populations, t2_meta$populations))
  
  link$dimensions <- lapply(link$dimensions, function(d){
    include <- unlist(sapply(d$categories, `[`, "include"))
    
    d$categories <- d$categories[include]
    d
  })

  # ==== Prepare table 1
  dimensions   <-names(t1_meta$dimensions)
  variables    <- names(t1_meta$variables)
  selected     <- unlist(sapply(link$dimensions, function(d) {if (!is.null(d$dimension2)) d$dimension1}))
  
  
  slice <- unlist(lapply(link$dimensions, 
                  function(d) { 
                    if (is.null(d$dimension2)){
                      category <- (unlist(lapply(d$categories, function(c){if (c$include) c$category1})))
                      names(category) <- d$dimension1
                      category
                  }
  }))
  not_selected <- dimensions[!(dimensions %in% selected)]
  
  # Remove non-selected dimensions; select the default category for these 
  # dimensions
  sel <- rep(TRUE, nrow(t1))
  for (dim in not_selected) {
    default <- slice[[dim]] #t1_meta$dimensions[[dim]]$default
    sel <- sel & t1[dim] == default
  }
  
  t1 <- t1[sel,]


  # Remove non-selected categories in selected dimensions
  sel_tab <- rep(TRUE, nrow(t1))
  for (dim in link$dimensions) {
  
    if (is.null(dim$dimension1)){
      next
    }
    
    sel_dim <- rep(FALSE, nrow(t1))

    for (cat in dim$categories) {
      if (is.null(cat$include) || cat$include == FALSE) next
      if (is.null(cat$category1) || grepl("^[[:space:]]*$", cat$category1)) next
      sel <- t1[[dim$dimension1]] == cat$category1
      sel_dim[sel] <- TRUE
    }
    
    if (!any(sel_dim)){
      default <- t1_meta$dimensions[[dim$dimension1]]$default
      sel_dim <- t1[[dim$dimension1]] == default
    }
    
    sel_tab <- sel_tab & sel_dim
  }

  t1 <- t1[sel_tab, c(selected, variables)]

  # Add variables to meta
  meta$variables <- t1_meta$variables[variables]

  # ==== Prepare table 2
  dimensions   <- names(t2_meta$dimensions)
  variables    <- names(t2_meta$variables)
  selected     <- unlist(sapply(link$dimensions, function(d) {if (!is.null(d$dimension1)) d$dimension2}))
  
  slice <- unlist(lapply(link$dimensions, 
                         function(d) { 
                           if (is.null(d$dimension1)){
                             category <- (unlist(lapply(d$categories, function(c){if (c$include) c$category2})))
                             names(category) <- d$dimension2
                             category
                           }
                         }))
  not_selected <- dimensions[!(dimensions %in% selected)]

  # Remove non-selected dimensions; select the default category for these 
  # dimensions
  sel <- rep(TRUE, nrow(t2))
  for (dim in not_selected) {
    default <- slice[[dim]]
    sel <- sel & t2[[dim]] == default
  }
  t2 <- t2[sel,]

  # Keep track of order of levels
  levels <- list()
  names <- list()

  # Remove non-selected categories in selected dimensions
  # Rename category labels of table 2 to those in table 1
  sel_tab <- rep(TRUE, nrow(t2))
  for (dim in link$dimensions) {
    
    if (is.null(dim$dimension2)){
      next
    }
    
    old <- t2[[dim$dimension2]]
    t2[[dim$dimension2]] <- NA

    sel_dim <- rep(FALSE, nrow(t2))
    # Copy dimensions to meta
    
    if (!is.null(dim$dimension1)){
      # what's this?
      meta$dimensions[[dim$dimension1]] <- t1_meta$dimensions[[dim$dimension1]]
  
      lvls <- character(0)
      nms <- character(0)
  
      for (cat in dim$categories) {
        if (is.null(cat$category2) || grepl("^[[:space:]]*$", cat$category2)) {
          lvls <- c(lvls, cat$category1)
          nms <- c(nms, cat$category1_name)
          next
        }
        if (is.null(cat$category1) || grepl("^[[:space:]]*$", cat$category1)) {
          sel <- old == cat$category2
          sel_dim[sel] <- TRUE
          cat2name = paste(link$table2,cat$category2, sep=":")
          t2[[dim$dimension2]][sel] <- cat2name
          lvls <- c(lvls, cat2name)
          nms <- c(nms, cat$category2_name)
        } else {
          sel <- old == cat$category2
          t2[[dim$dimension2]][sel] <- cat$category1
          sel_dim[sel] <- TRUE
          lvls <- c(lvls, cat$category1)
          nms <- c(nms, cat$category1_name)
        }
      }
      levels[[dim$dimension1]] <- lvls
      names[[dim$dimension1]] <- nms
    }
    
    if (!any(sel_dim)){
      default <- t2_meta$dimensions[[dim$dimension2]]$default
      sel_dim <- old == default
    }
    
    sel_tab <- sel_tab & sel_dim
  }
  t2 <- t2[sel_tab,  c(selected, variables)]

  # Add variables to meta
  meta$variables <- c(meta$variables, t2_meta$variables[variables])

  # ==== Merge
  dimensions1 <- unlist(sapply(link$dimensions, function(d) {if (!is.null(d$dimension2)) d$dimension1}))
  dimensions2 <- unlist(sapply(link$dimensions, function(d) {if (!is.null(d$dimension1)) d$dimension2}))
  t <- merge(t1, t2, by.x = dimensions1, by.y = dimensions2, all=TRUE)

  # ==== Assign levels to dimensions and sort table
  for (dim in names(levels)) {
    # Add to table
    lev <- levels[[dim]]
    nm <- names[[dim]]
    names(nm) <- lev
    # TODO for time variabels the order has to be adjusted!
    t[[dim]] <- factor(t[[dim]], levels=lev)

    # Add to meta
    meta$dimensions[[dim]]$levels <- NULL
    #TODO add description
    meta$dimensions[[dim]]$categories <- lapply(lev, function(l){list(level=l, name=nm[l])})
    # Check if aggregate and default present; if not use last level
    if (!is.null(meta$dimensions[[dim]]$default) &&
        !(meta$dimensions[[dim]]$default %in% levels[[dim]])) {
      meta$dimensions[[dim]]$default <- tail(levels[[dim]], 1)
    }
    if (!is.null(meta$dimensions[[dim]]$aggregate) &&
        !(meta$dimensions[[dim]]$aggregate %in% levels[[dim]])) {
      meta$dimensions[[dim]]$aggregate <- tail(levels[[dim]], 1)
    }
  }
  o <- do.call(order, t[names(levels)])
  t <- t[o, ]
  # ==== Output
  add_table(link$newtable, t, meta)

  # Return new table name
  return(link$newtable)
}