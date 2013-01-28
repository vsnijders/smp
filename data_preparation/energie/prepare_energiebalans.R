source("../settings.R", chdir=TRUE)

# read data
data <- read.csv2("energiebalans.csv", dec='.', na.strings=NA_STRINGS)
data <- data[c(4,5,6,8,9)]
names(data) <- c("Energiedragers", "Jaar", "Sector", "Energieaanbod", "Energieverbruik")

sector19 <- data$Sector %in% c("192 Aardolie-industrie", "Cokesfabrieken")
data19 <- data[sector19, ]
library(plyr)
data19 <- ddply(data19, c("Energiedragers", "Jaar"), summarise
                                                   , Sector = "19 Aardolie-industrie"
                                                   , Energieaanbod = sum(Energieaanbod, na.rm=TRUE)
                                                   , Energieverbruik = sum(Energieverbruik, na.rm=TRUE)
                                                   )
data <- rbind(data, data19)

data <- subset(data, Energiedragers == "Totaal energiedragers", select=-Energiedragers)

# remove ","
levels(data$Sector) <- gsub(",", " ", levels(data$Sector))

# Remove the * from Jaar
levels(data$Jaar) <- gsub("\\**$", "", levels(data$Jaar))

# Create meta
meta <- load_meta(data, "energiebalans.yaml", name="Energiebalans", pop_name="Bedrijven")

# Save data
add_table("energiebalans", data, meta, TABLE_DIR)
