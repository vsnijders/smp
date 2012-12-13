
table_info <- function(id) {
    data.frame(
        id = id,
        name = "bevolkingsprognoses",
        longname = "Prognose-intervallen; bevolking per 1 januari, leeftijdsgroep, 2011-2060",
        description = "Deze tabel bevat prognosecijfers over de bevolking van Nederland op 1 januari naar geslacht en leeftijd. In de tabel zijn ook prognose-intervallen opgenomen.",
        url = "http://statline.cbs.nl/StatWeb/publication/?DM=SLNL&PA=80755NED&D1=a&D2=0-20&D3=a&D4=a&VW=T"
    )
}

read_table <- function() {
    data <- read.csv2("bevolkingsprognoses/intervallen.csv")

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

    # change levels to numeric
    m$gender <- as.numeric(factor(m$gender, levels=c(
        "Male", "Female", "TOTAL"
      )))
    m$age <- as.numeric(factor(m$age, levels=c(
        "00-05", "05-10", "10-15", "15-20", "20-25", "25-30", "30-35", "35-40",
        "40-45", "45-50", "50-55", "55-60", "60-65", "65-70", "70-75", "75-80", "80-85",
        "85-90", "90-95", "95+", "TOTAL"
      )))
    m$year <- as.numeric(as.factor(m$year+ 2010))

    return(m)
}


