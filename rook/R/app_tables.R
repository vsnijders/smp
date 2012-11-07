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
<<<<<<< HEAD
  tables <- as.data.frame(do.call(rbind,list_tables()))
  print(tables)
=======
  tables <- data.frame(name=names(list_tables()))
>>>>>>> a02b89f6ef420dd0db4eb96c9c5cb3dce307f8df
  res$write(df_to_json(tables))
  res$finish()
}
