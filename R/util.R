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
  
  writeMeta(tab, dirname=dirname(file2))
  
  invisible(tab)
}

writeMeta <- function(dat, dirname){
  file <- file.path(dirname, "data.yml")
  vars <- sapply(dat, function(x){
    if (is.factor(x)){
      levels(x)
    } else {
      storage.mode(x)
    }
  })
}

cleanUpSL("bedrijvenfaillisementen/Uitgesproken_faillis_raw.csv")


file <- "bedrijvenfaillisementen/Uitgesproken_faillis_raw.csv"

f <- readLines(file)
# remove last line
f <- head(f, -1)

# change decimal sign
f <- gsub("(\\d)\\.(\\d)", "\\1,\\2", f)

writeLines(f, "test.csv")
skip <- 1
tab <- read.csv2("test.csv", header=TRUE, skip=skip, na.strings=c("-",".","x"))
str(tab)

head(f)