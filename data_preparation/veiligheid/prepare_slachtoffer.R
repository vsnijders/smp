source("../settings.R", chdir=TRUE)
library(rjson)
library(yaml)

# read data
data <- read.csv2("slachtoffer.csv", dec='.', na.strings=NA_STRINGS)

data <- data[c(1,2,5,7)]

names(data) <- c("Jaar", "Regio", "Delict", "Slachtofferschap")
levels(data$Delict) <- c("Geweldsdelicten", "Overige delicten", "Totaal", 
                           "Vandalismedelicten", "Vermogensdelicten")

# Create meta
meta <- load_meta(data, "slachtoffer.yaml")

# Save data
add_table("slachtoffer", data, meta, TABLE_DIR)
