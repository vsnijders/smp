library(RCurl)
library(yaml)

#' clean up a downloaded statline table
cleanUpSL <- function(file, skip = 1, colnames=NULL){
  f <- readLines(file)
  # remove last line
  f <- head(f, -1)
  
  # change decimal sign
  f <- gsub("(\\d)\\.(\\d)", "\\1,\\2", f)
  tmp <- tempfile()
  writeLines(f, tmp)
  skip <- 1
  tab <- read.csv2(tmp, header=TRUE, skip=skip, na.strings=c("-",".","x"))
  
  if (!is.null(colnames)){
    colnames(tab) <- colnames
  }
  
  file2 <- file.path(dirname(file), "data.csv")
  write.csv(tab, file2, row.names=FALSE)
  
  #writeMeta(tab, dirname=dirname(file2))
  
  invisible(tab)
}

writeMeta <- function(dat, dirname){
  file <- file.path(dirname, "data.yml")
  
  
  vars <- sapply(dat, function(x){
    if (is.factor(x)){
      list( name=NULL
          , levels=levels(x)
          , labels=levels(x)
          )
    } else {
      list( name=NULL
          , type=storage.mode(x)
          )
    }
  })
  
  writeLines(file, as.yaml(vars))
}

tab <- cleanUpSL("bedrijvenfaillisementen/Uitgesproken_faillis_raw.csv")
tab <- cleanUpSL("transport/Transportbedrijven_raw.csv", skip=3)
