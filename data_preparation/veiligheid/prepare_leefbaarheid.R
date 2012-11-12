source("../settings.R", chdir=TRUE)

# read data
data <- read.csv2("leefbaarheid.csv", dec='.', na.strings=NA_STRINGS)

data <- data[c(-1, -6)]
data$Perioden <- as.factor(data$Perioden)

sp <- split(data, data$Waarde.eenheid)

# leefbaarheid
data <- droplevels(sp[[2]])
data <- data[c(-1, -5)]
names(data) <- c("Aspect", "Regio", "Jaar", "Beoordeling")
library(reshape)
data <- cast(data, Regio + Jaar ~ Aspect)
meta <- load_meta(data, "leefbaarheid.yaml", pop_name="bevolking")
# Save data
add_table("leefbaarheid", data, meta, TABLE_DIR)


### overlast
data <- droplevels(sp[[1]])
data <- data[c(-1,-5)]
names(data) <- c("Soort", "Regio", "Jaar", "Overlast")

meta <- load_meta(data, "overlast.yaml", pop_name="bevolking")
# Save data
add_table("overlast", data, meta, TABLE_DIR)

### overlast2
data <- droplevels(sp[[3]])
data <- data[c(-1,-5)]
names(data) <- c("Soort", "Regio", "Jaar", "Overlast")

meta <- load_meta(data, "overlast2.yaml", pop_name="bevolking")
# Save data
add_table("overlast2", data, meta, TABLE_DIR)
