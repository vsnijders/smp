source("../settings.R", chdir=TRUE)
library(rjson)
library(yaml)

# read data
data <- read.csv2("slachtoffer.csv", dec='.', na.strings=NA_STRINGS)

names(data) <- c("Jaar", "Regio", "Slachtofferschap", "Geweldsdelicten", 
                 "Vermogensdelicten", "Vandalisme-delicten", "Overige delicten")

# Create meta
meta <- load_meta(data, "slachtoffer.yaml")

# Save data
add_table("slachtoffer", data, meta, TABLE_DIR)
