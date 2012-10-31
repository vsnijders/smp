
source("../settings.R", chdir=TRUE)
library(rjson)

# read data
data <- read.csv2("huisartspatienten.csv", dec='.', na.strings='.')

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

lvls <- unique(data$jaar)
data$jaar <- factor(data$jaar, levels=lvls, labels=lvls)
lvls <- unique(data$leeftijd)
data$leeftijd <- factor(data$leeftijd, levels=lvls, labels=lvls)
lvls <- c("Vrouw", "Man", "Totaal")
data$geslacht <- factor(data$geslacht, levels=lvls, labels=lvls)


# Order
o <- order(data$jaar, data$leeftijd, data$geslacht)
data <- data[o, ]

# Create meta
meta <- create_meta(data)
library(rjson)
write(toJSON(meta), file=paste0(TABLE_DIR, "/huisartspatienten_meta.json"))


write.table(data, paste0(TABLE_DIR, "/huisartspatienten.csv"), sep=",", 
  quote=FALSE, na="", row.names=FALSE)

# Add new table to list of tables
tables <- list()
tryCatch(tables <- readLines(paste0(TABLE_DIR, "/tables.json")), error=function(e){}, 
    warning=function(e){})
if (is.character(tables)) {
    tables <- fromJSON(paste(tables, collapse=""))
}
tables[["huisartspatienten"]] <- list(data = "huisartspatienten.csv", 
    meta="huisartspatienten_meta.json")
write(toJSON(tables), file=paste0(TABLE_DIR, "/tables.json"))

