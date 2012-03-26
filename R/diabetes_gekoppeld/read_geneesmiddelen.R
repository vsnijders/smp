


read_geneesmiddelen <- function() {

    data <- read.csv2("diabetes_geneesmiddelen/geneesmiddelen_diabetes.csv", dec='.')


    # remove columns with medication type (which is the same for all records)
    data$tmp <- NULL

    # remove ethnicity
    data <- data[data$herkomst == "Totaal", ]
    data$herkomst <- NULL

    # rename gender
    levels(data$geslacht) <- c("Man", "Totaal", "Vrouw")

    # aggregate age
    data$age <- "Totaal"
    data$age[data$leeftijd == "0 tot 15 jaar" ] <- "0 tot 25"
    data$age[data$leeftijd == "15 tot 25 jaar"] <- "0 tot 25"
    data$age[data$leeftijd == "25 tot 35 jaar"] <- "25 tot 35"
    data$age[data$leeftijd == "35 tot 45 jaar"] <- "35 tot 45"
    data$age[data$leeftijd == "45 tot 55 jaar"] <- "45 tot 55"
    data$age[data$leeftijd == "55 tot 65 jaar"] <- "55 tot 65"
    data$age[data$leeftijd == "65 tot 75 jaar"] <- "65 tot 75"
    data$age[data$leeftijd == "75 of ouder"   ] <- "75+"
    data$age[data$leeftijd == "Totaal alle leeftijden"] <- "Totaal"
    data$leeftijd <- data$age
    data$age <- NULL

    library(plyr)
    data <- ddply(data, c("jaar", "geslacht", "leeftijd"), function(d) {
            result <- d[1,]
            result$aantal <- sum(d$aantal, na.rm=TRUE)
            result$percentage <- round(mean(d$percentage, na.rm=TRUE),2)
            return(result)
        })

    names(data)[names(data) == "aantal"] <- "aantalgeneesmiddel"
    names(data)[names(data) == "percentage"] <- "percentageneesmiddel"

    return(data)
}

