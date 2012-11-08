library(rjson)

oldwd <- setwd("data_preparation/")
source("SL_cleanup.R")
source("settings.R")

dat <- SLcleaner("data_preparation/veiligheid/Slachtofferschap.csv")
data <- dat$data[c(1,2,4,7)]
names(data) <- c("Jaar", "regio", "Misdrijf", "Slachtofferpercentage")
writeMeta(data, "data_preparation/veiligheid/Slachtofferschap.csv", force=TRUE)

add_table("slachteroffer", data=data, meta=meta)

setwd(oldwd)