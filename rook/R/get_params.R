
get_params <- function(request) {

  parse_query <- function(qs = NULL, d = Utils$DEFAULT_SEP) {
    if (is.null(qs)) 
        base::stop("Need a character vector argument")
    x <- strsplit(qs, d, perl = TRUE)[[1L]]
    if (length(x) == 0) 
        return(list())
    z <- x != ""
    params <- new.env()
    params$params <- list()
    if (length(z)) {
        parseEqual <- function(i, params) {
            m <- regexpr("=", i)[1L]
            if (m > 0) {
                if (m == 1) {
                  params$params[[""]] <- i
                }
                else {
                  ilen <- nchar(i)
                  if (m == ilen) {
                    params$params[[i]] <- ""
                  }
                  else {
                    params$params[[substr(i, 1, m - 1)]] <- substr(i, 
                      m + 1, ilen)
                  }
                }
            }
            else {
                params$params[[i]] <- NA
            }
        }
        lapply(x[z], parseEqual, params)
    }
    params$params
  }

  POST <- function(req) {
    if (!exists("rook.input", req$env)) 
        stop("Missing rook.input")
    if (req$form_data() || req$parseable_data()) {
        req$env[["rook.request.form_list"]] <- Multipart$parse(req$env)
        if (length(req$env[["rook.request.form_list"]]) == 0) {
            form_vars <- req$env[["rook.input"]]$read()
            req$env[["rook.request.form_list"]] <- parse_query(rawToChar(form_vars))
        }
    }
    req$env[["rook.request.form_list"]]
  }

  GET <- function(req) {
    req$env[["rook.request.query_list"]] <- parse_query(req$query_string())
    req$env[["rook.request.query_list"]]
  }

  c(GET(request), POST(request))
}

