list_tables <- function(table_dirs = c("data/tmp", "data/tables")) {
  tables <- list()
  for (dir in table_dirs) {
      try({
        tlist  <- fromJSON(file=paste0(dir, "/tables.json"))
        for (table in names(tlist)) {
          tables[[table]]     <- tlist[[table]]
          tables[[table]]$dir <- dir
        }
      }, silent = TRUE)
  }
  return(tables)
}
