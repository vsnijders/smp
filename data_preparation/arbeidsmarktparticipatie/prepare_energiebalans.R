source("../settings.R", chdir=TRUE)

data <- read.csv2("arbeidsmarktparticipatie.csv")

data$geslacht <- factor(data$geslacht, levels=c('man', 'vrouw'))
data$generatie <- factor(data$generatie, levels=c(
  "1906-1910", "1911-1915", "1916-1920", "1921-1925", "1926-1930", "1931-1935", "1936-1940",
  "1941-1945", "1946-1950", "1951-1955", "1956-1960", "1961-1965", "1966-1970", "1971-1975",
  "1976-1980", "1981-1985", "1986-1990"))

library(reshape2)
data <- melt(data, id.vars=c("geslacht", "generatie"))
data$leeftijd <- as.factor(as.integer(gsub("^X", "", data$variable)))
data$variable <- "participatie"

data <- data[ , c("geslacht", "generatie", "leeftijd", "value")]
names(data)[4] <- "participatie"

# Create meta
meta_file <- "arbeidsmarktparticipatie.yaml"
if (!file.exists(meta_file)) {
  meta <- create_meta(data, name="arbeidsmarktparticipatie", description="Deze tabel bevat de arbeidsparticipatie
                      naar geslacht van verschillende generaties.")
  write(as.yaml(meta), file=meta_file)
  cat(paste("No file '", meta_file, "' containing the meta data for the file ",
            "was found. A default meta data file is generated. Edit this file and run ", 
            "this script again to regenerate the meta data for this table. For now ",
            "the default meta data is used.\n", sep=""))
} 
meta <- yaml.load_file(meta_file)

# Save data
add_table("arbeidsmarktparticipatie", data, meta, TABLE_DIR)
