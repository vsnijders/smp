
app_gen_link <- function(env){
  res <- Rook::Response$new()
  req <- Rook::Request$new(env)
  res$header("Content-Type", "application/json")
  
  table1 <- req$params()$table1
  table2 <- req$params()$table2
  
  tryCatch({
    link <- gen_link(table1, table2)
    res$write(toJSON(link))
    res$finish()
  }, error = function(e) {
    res$write(toJSON(list(fail=TRUE, message="Link was invalid.")))
  })
  res$finish()
}

