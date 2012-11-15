
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

  parse_query(request$query_string())
}

