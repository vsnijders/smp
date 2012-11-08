source("../settings.R", chdir=TRUE)

# read data
data <- read.csv2("energiebalans.csv", dec='.', na.strings=NA_STRINGS)
data <- data[c(4,5,6,8,9)]
names(data) <- c("Energiedragers", "Jaar", "Sector", "Energieaanbod", "Energieverbruik")

# remove "," 
levels(data$Sector) <- gsub(",", " ", levels(data$Sector))

# Create meta
meta <- load_meta(data, "energiebalans.yaml", name="Energiebalans", pop_name="Bedrijven")

# Save data
add_table("energiebalans", data, meta, TABLE_DIR)