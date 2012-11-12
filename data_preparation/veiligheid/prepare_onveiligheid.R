source("../settings.R", chdir=TRUE)

# read data
data <- read.csv2("onveiligheid.csv", dec='.', na.strings=NA_STRINGS)

names(data)[1:2] <- c("Regio", "Jaar")

# Create meta
meta <- load_meta(data, "onveiligheid.yaml", pop_name="bevolking")

# Save data
add_table("onveiligheid", data, meta, TABLE_DIR)