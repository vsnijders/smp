library(RSQLite)
source("lees_bevolkingsprognoses.R")
source("lees_testdata.R")

db <- dbConnect(dbDriver("SQLite"), dbname="test.sqlite")


tables <- data.frame(
        id = as.integer(c(1,2)),
        name = c("table1" , "table2"),
        description = c("First example table.", "Second example table."),
        stringAsFactors = FALSE
    )

tables <- data.frame()

t1 <- data.frame(
  id = 1,
  name = "table1",
  longname = "Prognose-intervallen; bevolking per 1 januari, leeftijdsgroep, 2011-2060",
  description = "Deze tabel bevat prognosecijfers over de bevolking van Nederland op 1 januari naar geslacht en leeftijd. In de tabel zijn ook prognose-intervallen opgenomen.",
  url = "http://statline.cbs.nl/StatWeb/publication/?DM=SLNL&PA=80755NED&D1=a&D2=0-20&D3=a&D4=a&VW=T"
  )
tables <- rbind(tables, t1)
t1$id <- 2
t1$name <- "table2"
tables <- rbind(tables, t1)
    
t3 <- data.frame(
  id = 3,
  name = "table3",
  longname = "Simple example table",
  description = "This is a simple generated table that can be used to test things out without having to work with large amounts of data.",
  url = ""
  )
tables <- rbind(tables, t3)

dbWriteTable(db, "tables", tables, row.names=FALSE, overwrite=TRUE)

table1 <- readtable1()
dbWriteTable(db, "table1", table1, row.names=FALSE, overwrite=TRUE)
dbWriteTable(db, "table2", table1, row.names=FALSE, overwrite=TRUE)

table3 <- generate_table1()
library(reshape2)
table3 <- melt(table3, id.var=c("gender", "age"))
table3$gender[is.na(table3$gender)] <- "Total"
table3$age[is.na(table3$age)] <- "Total"
dbWriteTable(db, "table3", table3, row.names=FALSE, overwrite=TRUE)


# We can retrieve the whole data frame 
#r2 <- dbReadTable(con, "foo")

# We can also perform a few queries on the table
#x <- dbGetQuery(con, "SELECT ...")

dbDisconnect(db)

