
table_info <- function(id) {
    data.frame(
        id = id,
        name = "diabetes",
        longname = "",
        description = "",
        url = ""
    )
}

source("diabetes/read_doktersbezoeken.R")

read_table <- function() {
  data <- read_doktersbezoeken()

  library(reshape2)
  data <- melt(data, id.vars=c("jaar", "inkomensgroep", "geslacht", "leeftijd"))

  return (data)
}


