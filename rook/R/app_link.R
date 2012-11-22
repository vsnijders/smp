
app_link <- function(env){
  res <- Rook::Response$new()
  req <- Rook::Request$new(env)
  res$header("Content-Type", "application/json")
  
  link <- req$params()$link
  if (is.null(link)) {
    res$write(toJSON(list(fail=TRUE, message="No link given.")))
    return(res$finish())
  }
  
  tryCatch({
    link <- fromJSON(link)
    new_table <- link_tables(link)
    res$write(toJSON(new_table))
    res$finish()
  }, error = function(e) {
    res$write(toJSON(list(fail=TRUE, message=as.character(e))))
  })
  res$finish()
}

