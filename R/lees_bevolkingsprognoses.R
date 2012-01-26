
readtable1 <- function() {
    data <- read.csv2("data/intervallen.csv")

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
    m$var2 <- gsub("05", "5", m$var2)
    m$var2 <- gsub("00", "0", m$var2)

    m$variable <- NULL
    m <- m[ , c("var1", "var2", "year", "var", "value")]
    names(m) <- c("gender", "age", "year", "variable", "value")

    table1 <- dcast(m, gender + age + year ~ variable)
}


