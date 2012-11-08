source("../settings.R", chdir=TRUE)

# read data
data <- read.csv2("crimi.csv", dec='.', na.strings=NA_STRINGS)

names(data) <- c("Regio", "Soort", "Jaar", "Aantal misdrijven", 
                 "Misdrijven per 1000 inwoners", "Opgehelderde misdrijven", 
                 "Perc. opgehelderd")
# Create meta
meta <- load_meta(data, "crimi.yaml", pop_name="Geregistreerde misdrijven")

# Save data
add_table("crimi", data, meta, TABLE_DIR)