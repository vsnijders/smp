library(yaml)

# Define some paths
setwd("../")
ROOT_DIR  <- getwd()
ROOK_DIR  <- paste0(ROOT_DIR, "/rook")
R_DIR     <- paste0(ROOK_DIR, "/R")
TABLE_DIR <- paste0(ROOK_DIR, "/data/tables")
NA_STRINGS <- c(".", "x","-")

# Source all r-files
rfiles <- list.files(R_DIR, pattern="\\.[rR]$")
for (file in rfiles) source(paste0(R_DIR, "/", file))

# load meta file or create if not available
load_meta <- function(data, meta_file="data.yaml", ...){
  if (!file.exists(meta_file)) {
    meta <- create_meta(data, ...)
    write(as.yaml(meta), file=meta_file)
    cat(paste("No file '", meta_file, "' containing the meta data for the file ",
              "was found. A default meta data file is generated. Edit this file and run ", 
              "this script again to regenerate the meta data for this table. For now ",
              "the default meta data is used.\n", sep=""))
  }
  meta <- yaml.load_file(meta_file)
  meta
}
