source("../settings.R", chdir=TRUE)

# read data
data <- read.csv2("productie.csv", dec='.', na.strings=NA_STRINGS, fileEncoding="latin1")
data <- data[c(1,2,4,12)]
names(data) <- c("Sector", "Jaar", "BrutoToegevoegdeWaardeBasisprijzen", "BrutoToegevoegdeWaardeBasisprijzenIndex")

levels(data$Sector) <- gsub(",", " ", levels(data$Sector))
# remove "," 
levels(data$Sector) <- gsub(",", " ", levels(data$Sector))

# Remove the * from Jaar
levels(data$Jaar) <- gsub("\\**$", "", levels(data$Jaar))

# Create meta
meta <- load_meta(data, "productie.yaml", name="Toegevoegde waarde per bedrijfstak", description="Bbp, productie en bestedingen; productie en inkomens naar bedrijfstak", pop_name="Bedrijven")

# Save data
add_table("productie", data, meta, TABLE_DIR)
