#' Rook application that returns the data of a table in JSON format
#'
#' @param env Rook environment variable
#'
#' @return Rook Request object
#'
#' @export
#'
app_get_table <- function(env){
  res <- Rook::Response$new()
  req <- Rook::Request$new(env)
  res$header("Content-Type", "application/json")
  table_name <- req$params()$table
  if (is.null(table_name)) {
    res$write(toJSON(list(fail=TRUE, message="table not given.")))
  } else {
    tryCatch({
      table <- get_table(table_name, meta=FALSE)
      res$write(df_to_json(table$data))
    }, error = function(e) {
      res$write(toJSON(list(fail=TRUE, 
        message=paste0("The table '", table_name, "' could not be opened."))))
      
    })
  }
  res$finish()
}

