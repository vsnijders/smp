
add_table <- function(tablename, data, meta) {
  # Save data
  dname    <- paste0(tablename, ".csv")
  filename <- paste0(TABLE_DIR, "/", dname)
  write.table(data, filename, sep=",", quote=FALSE, na="", row.names=FALSE)

  # Save meta
  mname    <- paste0(tablename, "_meta.json")
  filename <- paste0(TABLE_DIR, "/", mname)
  write(toJSON(meta), file=filename)

  # Add new table to list of tables
  tables <- list()
  tryCatch(tables <- readLines(paste0(TABLE_DIR, "/tables.json")), 
      error=function(e){}, warning=function(e){})
  if (is.character(tables)) {
      tables <- fromJSON(paste(tables, collapse=""))
  }
  tables[[tablename]] <- list(data = dname, meta=mname, name=meta$name, 
      description=meta$description)
  write(toJSON(tables), file=paste0(TABLE_DIR, "/tables.json"))
}

