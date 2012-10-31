
# Define some paths
setwd("../")
ROOT_DIR  <- getwd()
ROOK_DIR  <- paste0(ROOT_DIR, "/rook")
R_DIR     <- paste0(ROOK_DIR, "/R")
TABLE_DIR <- paste0(ROOK_DIR, "/data/tables")

# Source all r-files
rfiles <- list.files(R_DIR, pattern="\\.[rR]$")
for (file in rfiles) source(paste0(R_DIR, "/", file))

