# clean up StatLine download
SLcleaner <- function(file, DUMP=TRUE, ...){  
  data <- read.delim(file, sep=";", na.strings=c(".", "x"))
  
  if (DUMP){
    data_out <- sub("(\\.\\w+$)", "_cl\\1", file)
    write.csv2(data, file=data_out, row.names=FALSE)
  }
  
  meta <- writeMeta(data, file)
  list(data=data, meta=meta)
}

# assumes createmeta is loaded!
writeMeta <- function(data, file, force=FALSE){
  require(yaml)
  file <- sub("\\.\\w+$", ".yaml", file)  
  
  if (!file.exists(file) || force) {
    meta <- create_meta(data)
    write(as.yaml(meta), file=file)
    cat(paste("No file '", file, "' containing the meta data for the file ",
              "was found. A default meta data file is generated. Edit this file and run ", 
              "this script again to regenerate the meta data for this table. For now ",
              "the default meta data is used.\n", sep=""))
  } 
  meta <- yaml.load_file(file)
  meta
}