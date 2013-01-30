
source("../settings.R", chdir=TRUE)

source("read_table.R")

data <- read_table()

data$variable <- NULL
names(data)[5] <- "number_of_persons"


# Create meta
meta_file <- "arbeidsmarktdynamiek.yaml"
if (!file.exists(meta_file)) {
  meta <- create_meta(data, name="arbeidsmarktdynamiek", description="Arbeidsmarktdynamiek; veranderingen in arbeidsmarktpositie")
  write(as.yaml(meta), file=meta_file)
  cat(paste("No file '", meta_file, "' containing the meta data for the file ",
            "was found. A default meta data file is generated. Edit this file and run ", 
            "this script again to regenerate the meta data for this table. For now ",
            "the default meta data is used.\n", sep=""))
} 
meta <- yaml.load_file(meta_file)

# Save data
add_table("arbeidsmarktdynamiek", data, meta, TABLE_DIR)

