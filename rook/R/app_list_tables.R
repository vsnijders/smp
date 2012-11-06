#' Rook application that returns a list of available tables in JSON format
#'
#' @param env Rook environment variable
#'
#' @return Rook Request object
#'
#' @export
#'
app_list_tables <- function(env){
  res <- Rook::Response$new()
  res$header("Content-Type", "application/json")
  tables <- list_tables()
  if (is.null(tables)) tables <- list()
  res$write(toJSON(tables))
  res$finish()
}

