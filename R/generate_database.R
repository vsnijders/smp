
library(RSQLite)

# Create database
db <- dbConnect(dbDriver("SQLite"), dbname="test.sqlite")

# Initialise data.frame that is to contain all information of the tables stored
# in the database
info <- data.frame()

# List of tables to read in (each element should be a directory containing an 
# r-script read_table.R defining the functions
# - read_table() that returns the table as a data.frame 
# - table_info(id) that returns a data.frame with information about the table
tables <- c("bevolkingsprognoses", "exampletable")

# Read all tables and add to database
for (i in seq_along(tables)) {
    source(file.path(tables[i], "read_table.R"))
    inf   <- table_info(i)
    table <- read_table()
    info  <- rbind(info, inf)
    dbWriteTable(db, as.character(info$name), table, row.names=FALSE, overwrite=TRUE)

}

# Write table info to database
dbWriteTable(db, "tables", info, row.names=FALSE, overwrite=TRUE)

# Close database connection
dbDisconnect(db)

