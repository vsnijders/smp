
table_info <- function(id) {
    data.frame(
        id = id,
        name = "exampletable",
        longname = "Simple example table",
        description = "This is a simple generated table that can be used to test things out without having to work with large amounts of data.",
        url = ""
    )
}

read_table <- function() {
    gender <- c("Male", "Female")
    age <- c("0-25", "25-50", "50-65", "65+")

    gender_age <- expand.grid(gender=gender, age=age)
    gender_age$income <- round(rnorm(nrow(gender_age), 40000, 5000), 0)
    gender_age$x <- round(runif(nrow(gender_age), 0, 100), 0)

    library(plyr)

    a1 <- ddply(gender_age, .(gender), summarise, age=NA, income=mean(income), x=sum(x))
    a2 <- ddply(gender_age, .(age), summarise, gender=NA, age=age[1], income=mean(income), x=sum(x))
    a3 <- ddply(gender_age, .(), summarise, gender=NA, age=NA, income=mean(income), x=sum(x))
    a3$.id <- NULL

    table <- rbind(a3, a1, a2, gender_age)

    library(reshape2)
    table <- melt(table, id.var=c("gender", "age"))
    table$gender[is.na(table$gender)] <- "Total"
    table$age[is.na(table$age)] <- "Total"

    return(table)
}


