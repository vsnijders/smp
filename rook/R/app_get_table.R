app_get_table <- function(env){
  res <- Rook::Response$new()
  req <- Rook::Request$new(env)
  res$header("Content-Type", "application/json")
  table_name <- req$params()$table
  table <- get_table(table_name, meta=FALSE)
  # TODO error handling if table does not exist
  res$write(df_to_json(table$data))
  res$finish()
}

