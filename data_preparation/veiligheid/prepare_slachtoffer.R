source("../settings.R", chdir=TRUE)
library(rjson)
library(yaml)

# read data
data <- read.csv2("slachtoffer.csv", dec='.', na.strings='.')

names(data) <- c("Jaar", "Regio", "Slachtofferschap", "Geweldsdelicten", 
                 "Vermogensdelicten", "Vandalisme-delicten", "Overige delicten")

# Create meta
meta_file <- "slachtoffer.yaml"
if (!file.exists(meta_file)) {
  meta <- create_meta(data)
  write(as.yaml(meta), file=meta_file)
  cat(paste("No file '", meta_file, "' containing the meta data for the file ",
            "was found. A default meta data file is generated. Edit this file and run ", 
            "this script again to regenerate the meta data for this table. For now ",
            "the default meta data is used.\n", sep=""))
} 
meta <- yaml.load_file(meta_file)

# Save data
add_table("slachtoffer", data, meta, TABLE_DIR)
