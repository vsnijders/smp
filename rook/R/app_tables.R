#' Rook application that returns the data of a table in JSON format
#'
#' @param env Rook environment variable
#'
#' @return Rook Request object
#'
#' @export
#'
app_tables <- function(env){
  res <- Rook::Response$new()
  res$header("Content-Type", "application/json")

  req <- Rook::Request$new(env)
  tables <- as.data.frame(do.call(rbind,list_tables()))
  print(tables)
  res$write(df_to_json(tables))
  res$finish()
}
