
read_gezo <- function() {

    data <- read.csv2("diabetes_gekoppeld/gezo.csv", dec='.', na.strings='.')

    # split gender and age
    data$geslacht <- "Totaal"
    data$geslacht[grep("man|Mannen", data$leeftijd_geslacht)] <- "Man"
    data$geslacht[grep("vrouw|Vrouwen", data$leeftijd_geslacht)] <- "Vrouw"

    data$leeftijd <- "Totaal"
    data$leeftijd[grep("75", data$leeftijd_geslacht)] <- "75+"
    lft <- regexpr("[0-9]+ tot [0-9]+", data$leeftijd_geslacht)
    data$leeftijd[lft > 0] <- regmatches(data$leeftijd_geslacht, lft)

    # remove gender:age column and reorder columns
    nms <- names(data)[!(names(data) %in% c("jaar", "leeftijd_geslacht", "leeftijd", "geslacht"))]
    data <- data[, c("jaar", "leeftijd", "geslacht", nms)]

    # aggregate age categories
    age <- data$leeftijd
    age[data$leeftijd == "0 tot 12"] <- "0 tot 25"
    age[data$leeftijd == "12 tot 18"] <- "0 tot 25"
    age[data$leeftijd == "18 tot 25"] <- "0 tot 25"
    data$leeftijd <- age

    library(plyr)
    data <- ddply(data, c("jaar", "leeftijd", "geslacht"), function(d) {
            result <- d[1,]
            result[, nms] <- round(colMeans(d[, nms], na.rm=TRUE),1)
            return(result)
        })


    return(data)
}

