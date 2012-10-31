df_to_json <- function(df) {
  res <- character(nrow(df))
  for (col in seq_along(df)) {
    if (col > 1) res <- paste(res, ", ", sep="")
    res <- paste(res, "\"", names(df)[col], "\":\"", df[[col]], "\"", sep="")
  }
  res <- paste("{", res, "}", sep="", collapse=",\n")
  res <- paste("[", res, "]\n", sep="\n")
  return(res)
}

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

