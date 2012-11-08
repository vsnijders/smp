source("../settings.R", chdir=TRUE)

# read data
data <- read.csv2("productie.csv", dec='.', na.strings=NA_STRINGS)
data <- data[c(1,2,4,12)]
names(data) <- c("Sector", "Jaar", "Bruto toegevoegde waarde basisprijzen (2005)", "Bruto.toegevoegde.waarde.basisprijzen (index)")

levels(data$Sector) <- gsub(",", " ", levels(data$Sector))
# remove "," 
levels(data$Sector) <- gsub(",", " ", levels(data$Sector))

# Create meta
meta <- load_meta(data, "productie.yaml", name="Toegevoegde waarde per bedrijfstak", description="Bbp, productie en bestedingen; productie en inkomens naar bedrijfstak", pop_name="Bedrijven")

# Save data
add_table("productie", data, meta, TABLE_DIR)