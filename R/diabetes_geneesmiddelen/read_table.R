
table_info <- function(id) {
    data.frame(
        id = id,
        name = "diabetes_medicine",
        longname = "",
        description = "",
        url = ""
    )
}

source("diabetes_geneesmiddelen/read_geneesmiddelen.R")

read_table <- function() {
    data <- read_geneesmiddelen()

    library(reshape2)
    data <- melt(data, id.vars=c("jaar", "herkomst", "geslacht", "leeftijd"))

    return (data)
}


