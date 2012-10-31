app_get_meta <- function(env){
  res <- Rook::Response$new()
  req <- Rook::Request$new(env)
  res$header("Content-Type", "application/json")
  table_name <- req$params()$table
  table <- get_table(table_name, data=FALSE)
  # TODO error handling if table does not exist
  res$write(toJSON(table$meta))
  res$finish()
}

