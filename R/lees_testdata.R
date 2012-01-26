
generate_table1 <- function() {
    gender <- c("Male", "Female")
    age <- c("0-25", "25-50", "50-65", "65+")

    gender_age <- expand.grid(gender=gender, age=age)
    gender_age$income <- round(rnorm(nrow(gender_age), 40000, 5000), 0)
    gender_age$x <- round(runif(nrow(gender_age), 0, 100), 0)

    library(plyr)

    a1 <- ddply(gender_age, .(gender), summarise, age=NA, income=mean(income), x=sum(x))
    a2 <- ddply(gender_age, .(age), summarise, gender=NA, age=age[1], income=mean(income), x=sum(x))
    a3 <- ddply(gender_age, .(), summarise, gender=NA, age=NA, income=mean(income), x=sum(x))
    a3$.id <- NULL

    return(rbind(a3, a1, a2, gender_age))
}



