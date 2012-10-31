app_list_tables <- function(env){
  res <- Rook::Response$new()
  res$header("Content-Type", "application/json")
  tables <- names(list_tables())
  res$write(toJSON(tables))
  res$finish()
}

