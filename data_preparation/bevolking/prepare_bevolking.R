
source("../settings.R", chdir=TRUE)
library(rjson)
library(yaml)

# read data
data <- read.csv2("intervallen.csv", dec='.', na.strings='.')

levels(data$var) <- c("ub_67", "ub_95", "lb_67", "lb_95", "prognosis")

library(reshape2)

m <- melt(data, id.var=c("var", "year"))

m$var1 <- gsub("_.*$", "", as.character(m$variable))
m$var1[m$var1 == "total"] <- NA
m$var1 <- factor(m$var1, levels=c("male", "female"), labels=c("Male", "Female"))

m$var2 <- gsub("^[a-z]+_", "", as.character(m$variable))
m$var2[m$var2 == "total"] <- NA
m$var2 <- gsub("_", "-", m$var2)
m$var2 <- gsub("-00", "+", m$var2)
#m$var2 <- gsub("05", "5", m$var2)
#m$var2 <- gsub("00", "0", m$var2)

m$variable <- NULL
m <- m[ , c("var1", "var2", "year", "var", "value")]
names(m) <- c("gender", "age", "year", "variable", "value")

levels(m$gender) <- c(levels(m$gender), "TOTAL")
m$gender[is.na(m$gender)] <- "TOTAL"
levels(m$age) <- c(levels(m$age), "TOTAL")
m$age[is.na(m$age)] <- "TOTAL"

# only select prognoses; ignore confidence intervals for now
m <- m[m$variable == "prognosis", ]
m$variable <- NULL
names(m)[names(m) == "value"] <- "prognosis"

data <- m
o <- order(data$year, data$age, data$gender)
data <- data[o, ]
data <- transform(data, age=factor(age), year=factor(year))

# Create meta
meta_file <- "bevolking.yaml"
if (!file.exists(meta_file)) {
  meta <- create_meta(data, name="Bevolkingsprognoses", description="Deze tabel bevat prognosecijfers 
                      over de bevolking van Nederland op 1 januari naar geslacht en leeftijd. 
                      In de tabel zijn ook prognose-intervallen opgenomen.")
  write(as.yaml(meta), file=meta_file)
  cat(paste("No file '", meta_file, "' containing the meta data for the file ",
    "was found. A default meta data file is generated. Edit this file and run ", 
    "this script again to regenerate the meta data for this table. For now ",
    "the default meta data is used.\n", sep=""))
} 
meta <- yaml.load_file(meta_file)

# Save data
add_table("bevolking", data, meta, TABLE_DIR)
