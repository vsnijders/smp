

read_huisartspatienten <- function() {

    data <- read.csv2("diabetes_gekoppeld/huisartspatienten.csv", dec='.', na.strings='.')

    # remove unneeded columns
    data$o1 <- NULL
    data$o2 <- NULL
    data$o3 <- NULL
    data$o4 <- NULL
    data$soort <- NULL

    # rename levels
    levels(data$geslacht) <- c("Man", "Totaal", "Vrouw")

    # aggregate age
    data$age <- "Totaal"
    data$age[data$leeftijd == "0 jaar"          ] <- "0 tot 25"
    data$age[data$leeftijd == "1 tot 5 jaar"    ] <- "0 tot 25"
    data$age[data$leeftijd == "5 tot 10 jaar"   ] <- "0 tot 25"
    data$age[data$leeftijd == "10 tot 15 jaar"  ] <- "0 tot 25"
    data$age[data$leeftijd == "15 tot 20 jaar"  ] <- "0 tot 25"
    data$age[data$leeftijd == "20 tot 25 jaar"  ] <- "0 tot 25"
    data$age[data$leeftijd == "25 tot 30 jaar"  ] <- "25 tot 35"
    data$age[data$leeftijd == "30 tot 35 jaar"  ] <- "25 tot 35"
    data$age[data$leeftijd == "35 tot 40 jaar"  ] <- "35 tot 45"
    data$age[data$leeftijd == "40 tot 45 jaar"  ] <- "35 tot 45"
    data$age[data$leeftijd == "45 tot 50 jaar"  ] <- "45 tot 55"
    data$age[data$leeftijd == "50 tot 55 jaar"  ] <- "45 tot 55"
    data$age[data$leeftijd == "55 tot 60 jaar"  ] <- "55 tot 65"
    data$age[data$leeftijd == "60 tot 65 jaar"  ] <- "55 tot 65"
    data$age[data$leeftijd == "65 tot 70 jaar"  ] <- "65 tot 75"
    data$age[data$leeftijd == "70 tot 75 jaar"  ] <- "65 tot 75"
    data$age[data$leeftijd == "75 jaar of ouder"] <- "75+"
    data$age[data$leeftijd == "Totaal leeftijd" ] <- "Totaal"
    data$leeftijd <- data$age
    data$age <- NULL

    library(plyr)
    data <- ddply(data, c("jaar", "geslacht", "leeftijd"), function(d) {
            result <- d[1,]
            result$aantalpatienten <- round(mean(d$aantalpatienten, na.rm=TRUE)/10,1)
            return(result)
        })

    return(data)
}


