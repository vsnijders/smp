
source("../settings.R", chdir=TRUE)
library(rjson)
library(yaml)

# read data
data <- read.csv2("gezo.csv", dec='.', na.strings='.')

# split gender and age
data$geslacht <- "Totaal"
data$geslacht[grep("man|Mannen", data$leeftijd_geslacht)] <- "Man"
data$geslacht[grep("vrouw|Vrouwen", data$leeftijd_geslacht)] <- "Vrouw"

data$leeftijd <- "Totaal"
data$leeftijd[grep("75", data$leeftijd_geslacht)] <- "75+"
lft <- regexpr("[0-9]+ tot [0-9]+", data$leeftijd_geslacht)
data$leeftijd[lft > 0] <- regmatches(data$leeftijd_geslacht, lft)

# remove gender:age column and reorder columns
nms <- names(data)[!(names(data) %in% c("jaar", "leeftijd_geslacht",
  "leeftijd", "geslacht"))]
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

# Assign levels of table dimensions
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
meta_file <- "gezo.yaml"
if (!file.exists(meta_file)) {
  meta <- create_meta(data)
  write(as.yaml(meta), file=meta_file)
  cat(paste("No file '", meta_file, "' containing the meta data for the file ",
    "was found. A default meta data file is generated. Edit this file and run ", 
    "this script again to regenerate the meta data for this table. For now ",
    "the default meta data is used.\n", sep=""))
} 
meta <- yaml.load_file(meta_file)

# Save data
add_table("gezo", data, meta)

