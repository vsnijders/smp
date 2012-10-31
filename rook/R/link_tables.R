
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


  # ==== Merge
  dimensions1 <- sapply(link$dimensions, function(d) d$dimension1)
  dimensions2 <- sapply(link$dimensions, function(d) d$dimension2)
  t <- merge(t1, t2, by.x = dimensions1, by.y = dimensions2, all=TRUE)

  # ==== Assign levels to dimensions and sort table
  for (dim in names(levels)) {
    t[[dim]] <- factor(t[[dim]], levels=levels[[dim]])
  }
  o <- do.call(order, t[names(levels)])
  t <- t[o, ]

  # ==== Output
  # TODO Perhaps better is to have a separate function that saves the table and
  # adds it to the list of tables

  # Write table to temporary tables directory
  filename <- paste0("data/tmp/", link$newtable, ".csv")
  write.table(t, filename, sep=",", quote=FALSE, na="", row.names=FALSE)

  # Create meta
  filename_meta <- paste0("data/tmp/", link$newtable, "_meta.json")
  meta <- create_meta(t)
  write(toJSON(meta), file=filename_meta)

  # Add new table to list of tables
  tables <- list()
  tryCatch(tables <- readLines("data/tmp/tables.json"), error=function(e){}, 
      warning=function(e){})
  if (is.character(tables)) {
      tables <- fromJSON(paste(tables, collapse=""))
  }
  tables[[link$newtable]] <- list(data = paste0(link$newtable, ".csv"),
      meta = paste0(link$newtable, "_meta.json"))
  write(toJSON(tables), file="data/tmp/tables.json")

  # Return new table name
  return(link$newtable)
}

