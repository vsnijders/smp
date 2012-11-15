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

  # Read all necessary data
  t1 <- get_table(link$table1)
  t1_meta <- t1$meta
  t1      <- t1$data
  t2      <- get_table(link$table2)
  t2_meta <- t2$meta
  t2      <- t2$data

  # Initialise list with meta for dimensions and variables
  meta <- list(
    name = link$newtable,
    description = paste0("Table created by linking the tables '", 
      t1_meta$name, "' and '", t2_meta$name, "'."),
    dimensions = list(),
    variables = list(),
    populations = c(t1_meta$populations, t2_meta$populations))

  # ==== Prepare table 1
  dimensions   <- names(t1_meta$dimensions)
  variables    <- names(t1_meta$variables)
  selected     <- sapply(link$dimensions, function(d) d$dimension1)
  not_selected <- dimensions[!(dimensions %in% selected)]

  # Remove non-selected dimensions; select the default category for these 
  # dimensions
  sel <- rep(TRUE, nrow(t1))
  for (dim in not_selected) {
    default <- t1_meta$dimensions[[dim]]$default
    sel <- sel & t1[dim] == default
  }
  t1 <- t1[sel, c(selected, variables)]


  # Remove non-selected categories in selected dimensions
  sel_tab <- rep(TRUE, nrow(t1))
  for (dim in link$dimensions) {
    sel_dim <- rep(FALSE, nrow(t1))

    for (cat in dim$categories) {
      if (is.null(cat$category1)) next
      sel <- t1[[dim$dimension1]] == cat$category1
      sel_dim[sel] <- TRUE
    }
    sel_tab <- sel_tab & sel_dim
  }

  t1 <- t1[sel_tab, ]

  # Add variables to meta
  meta$variables <- t1_meta$variables[variables]

  # ==== Prepare table 2
  dimensions   <- names(t2_meta$dimensions)
  variables    <- names(t2_meta$variables)
  selected     <- sapply(link$dimensions, function(d) d$dimension2)
  not_selected <- dimensions[!(dimensions %in% selected)]

  # Remove non-selected dimensions; select the default category for these 
  # dimensions
  sel <- rep(TRUE, nrow(t2))
  for (dim in not_selected) {
    default <- t2_meta$dimensions[[dim]]$default
    sel <- sel & t2[dim] == default
  }
  t2 <- t2[sel, c(selected, variables)]

  # Keep track of order of levels
  levels <- list()

  # Remove non-selected categories in selected dimensions
  # Rename category labels of table 2 to those in table 1
  sel_tab <- rep(TRUE, nrow(t2))
  for (dim in link$dimensions) {
    old <- t2[[dim$dimension2]]
    t2[[dim$dimension2]] <- NA

    sel_dim <- rep(FALSE, nrow(t2))

    # TEST
    meta$dimensions[[dim$dimension1]] <- t2_meta$dimensions[[dim$dimension1]]
    meta$dimensions[[dim$dimension1]]$levels <- character(0)

    levels[[dim$dimension1]] <- character(0)

    for (cat in dim$categories) {
      if (is.null(cat$category2)) {
        levels[[dim$dimension1]] <- c(levels[[dim]], cat$category1)
        next
      }
      if (is.null(cat$category1)) {
        sel <- old == cat$category2
        sel_dim[sel] <- TRUE
        # TODO check if cat$category2 also present in table 1; in that case there
        # will be a problem as these will be linked. For now we will keep the 
        # name from table 2.
        t2[[dim$dimension2]][sel] <- cat$category2
        levels[[dim$dimension1]] <- c(levels[[dim$dimension1]], cat$category2)
      } else {
        sel <- old == cat$category2
        t2[[dim$dimension2]][sel] <- cat$category1
        sel_dim[sel] <- TRUE
        levels[[dim$dimension1]] <- c(levels[[dim$dimension1]], cat$category1)
      }
    }
    sel_tab <- sel_tab & sel_dim
  }
  t2 <- t2[sel_tab, ]

  # Add variables to meta
  meta$variables <- c(meta$variables, t2_meta$variables[variables])

  # ==== Merge
  dimensions1 <- sapply(link$dimensions, function(d) d$dimension1)
  dimensions2 <- sapply(link$dimensions, function(d) d$dimension2)
  t <- merge(t1, t2, by.x = dimensions1, by.y = dimensions2, all=TRUE)

  # ==== Assign levels to dimensions and sort table
  for (dim in names(levels)) {
    # Add to table
    t[[dim]] <- factor(t[[dim]], levels=levels[[dim]])

    # Add to meta
    meta$dimensions[[dim]]$levels <- levels[[dim]]
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


