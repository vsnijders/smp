app_get_meta <- function(env){
  res <- Rook::Response$new()
  req <- Rook::Request$new(env)
  res$header("Content-Type", "application/json")
  table_name <- req$params()$table
  if (is.null(table_name)) {
    res$write(toJSON(list(fail=TRUE, message="table not given.")))
  } else {
    tryCatch({
      table <- get_table(table_name, data=FALSE)
      res$write(toJSON(table$meta))
    }, error = function(e) {
      res$write(toJSON(list(fail=TRUE, 
        message=paste0("The table '", table_name, "' could not be opened."))))
      
    })
  }
  res$finish()
}

