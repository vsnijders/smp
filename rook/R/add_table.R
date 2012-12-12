
add_table <- function(tablename, data, meta, table_dir = "data/tmp") {
  stopifnot(require(rjson))
  
  # Save data
  dname    <- paste0(tablename, ".csv")
  filename <- paste0(table_dir, "/", dname)
  write.table(data, filename, sep=",", quote=FALSE, na="", row.names=FALSE)

  # Save meta
  mname    <- paste0(tablename, "_meta.json")
  filename <- paste0(table_dir, "/", mname)
  write(toJSON(meta), file=filename)
  
  if (require(yaml)){
    write(as.yaml(meta), file=sub("json$", "yml", filename))
  }

  # Add new table to list of tables
  tables <- list()
  tryCatch(tables <- readLines(paste0(table_dir, "/tables.json")), 
      error=function(e){}, warning=function(e){})
  if (is.character(tables)) {
      tables <- fromJSON(paste(tables, collapse=""))
  }
  tables[[tablename]] <- list(data = dname, meta=mname, name=meta$name, 
      description=meta$description)
  write(toJSON(tables), file=paste0(table_dir, "/tables.json"))
}

