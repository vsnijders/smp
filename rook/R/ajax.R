

registerAjax <- function(dir="ajax"){
  
  # source functions into e and wrap them
  # TODO 
  # Source all files in r directory
  
  rfiles <- list.files("R/ajax", pattern="\\.[rR]$")
  for (file in rfiles) source(paste0("R/ajax", file), local=TRUE)
  
  for (n in ls()){
    fn <- eval(as.symbol(n))
    if (is.function(fn)){
      fnn <- paste0(n, ".wrapped")
      assign(fnn, wrapFunction(fn))
    }
  }
  
  dispatch <- function(env){
    req <- Rook::Request$new(env)
    functionname <- sub("^/ajax/", "", req$path())
    functionname <- paste0(functionname, ".wrapped")
    
    # tryCatch?
    do.call(functionname, env)
  }
  
  dispatch
}

wrapFunction <- function(f){
  
  wrapped <- function(env){
    require(rsjon)
    res <- Rook::Response$new()
    req <- Rook::Request$new(env)
    res$header("Content-Type", "application/json")  
    
    params <- get_params(req)
    
    tryCatch({
              params <- lapply(params, fromJSON)
              result <- do.call(f, params)
              res$write(toJSON(result))
             , res$write(toJSON(list(fail=TRUE, message=e)))
             , finally = res$finish()
    })
    
  wrapped
}
  
wrapJS <- function(f, name=deparse(substitute(f))){
  arg <- names(formals(f))
  arg <- paste(arg, collapse=",")
  paste0("function ",name,"(", arg, "){"
        , 
        , "}\n"
        )
}