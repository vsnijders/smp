#' Rook application that returns the data of a table in JSON format
#'
#' @param env Rook environment variable
#'
#' @return Rook Request object
#'
#' @export
#'
app_fetch <- function(env){
  res <- Rook::Response$new()
  req <- Rook::Request$new(env)
  res$header("Content-Type", "application/json")

  # Extract query from POST/GET request
  # Temporary fix for problem with rook; now use our own get_params instead
  # of the usual req$params(). get_params only works with get request
  params     <- get_params(req);
  table_name <- params$table
  selection  <- fromJSON(params$selection)
  filter     <- fromJSON(params$filter)

  # Read data
  table <- get_table(table_name, meta=TRUE)
  meta  <- table$meta
  table <- table$data

  # Determine which dimensions and variables are selected on which are not 
  # selected
  variables      <- unlist(selection)
  dimensions_sel <- names(meta$dimensions) %in% variables
  dimensions_not <- names(meta$dimensions)[!dimensions_sel]
  dimensions_sel <- names(meta$dimensions)[dimensions_sel]
  variables_sel  <- names(meta$variables) %in% variables
  variables_sel  <- names(meta$variables)[variables_sel]

  # Select for the non selected dimensions the aggregate values
  sel <- rep(TRUE, nrow(table))
  for (dim in dimensions_not) {
    # get default category
    default <- meta$dimensions[[dim]]$default
    # when categories selected in filter these overrule the default categories
    if (!is.null(filter[[dim]])) {
      default <- filter[[dim]][1]
    }
    sel <- sel & (table[[dim]] == default)
  }

  # Select for the selected dimensions the non-aggregated values
  for (dim in dimensions_sel) {
    # get aggregate category
    default <- meta$dimensions[[dim]]$aggregate
    if (is.null(default)) next;
    # when categories selected in filter we do not filter
    if (is.null(filter[[dim]])) {
      sel <- sel & !(table[[dim]] %in% default)
    }
  }


  # Filter the data
  for (dim in names(filter)) {
    sel <- sel & (table[[dim]] %in% filter[[dim]])
  }

  # Select the columns of the dimensions and variables that are selected
  table <- table[sel, c(dimensions_sel, variables_sel)]


  res$write(df_to_json(table))


  res$finish()
}


