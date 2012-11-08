
source("../settings.R", chdir=TRUE)
library(rjson)
library(yaml)

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
meta_file <- "huisartspatienten.yaml"
if (!file.exists(meta_file)) {
  meta <- create_meta(data)
  write(as.yaml(meta), file=meta_file)
  cat(paste("No file '", meta_file, "' containing the meta data for the file",
    "was found. A default meta data file is generated. Edit this file and run", 
    "this script again to regenerate the meta data for this table. For now the",
    "default meta data is used.\n", sep=""))
} 
meta <- yaml.load_file(meta_file)

# Save data
add_table("huisartspatienten", data, meta, TABLE_DIR)

