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

