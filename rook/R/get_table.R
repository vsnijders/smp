get_table <- function(table_name, data=TRUE, meta=TRUE) {

  # Get list of tables; also contains the paths to files
  tables <- list_tables()

  # Check if table exists
  if (!(table_name %in% names(tables))) 
    stop("The table '", table_name, "' does not exist.")

  # Get info beloning to table from tables
  table <- tables[[table_name]]

  # Read the table
  if (data) {
    filename <- paste0(table$dir, "/", table$data)
    data     <- read.delim(filename, sep=",", colClasses="character")
    # TODO convert columns to correct class using info from meta
  }

  # Read the meta data belonging to the table
  if (meta) {
    filename <- paste0(table$dir, "/", table$meta)
    meta     <- readLines(filename, warn=FALSE)
    meta     <- fromJSON(meta)
  }

  return(list(data=data, meta=meta))
} 

