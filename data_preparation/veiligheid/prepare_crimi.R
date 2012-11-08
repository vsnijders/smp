library(rjson)

oldwd <- setwd("data_preparation/")
source("SL_cleanup.R")
source("settings.R")

dat <- SLcleaner("data_preparation/veiligheid/Geregistreerde_crimi.csv")

add_table("crimi", data=dat$data, meta=dat$meta)

setwd(oldwd)