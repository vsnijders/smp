
table_info <- function(id) {
    data.frame(
        id = id,
        name = "bedrijvenaantallen",
        longname = "",
        description = "",
        url = ""
    )
}

read_aantallen <- function() {
    data <- read.csv2("bedrijvenaantallen/aantallen.csv", header=FALSE)

    data <- data[, c(-2, -5)]

    names(data) <- c("sbi_naam", "gk", "jaar", "aantal")

    data$sbi <- substr(data$sbi_naam, 1, 1)

    data$grootteklasse <- NA
    data$grootteklasse[data$gk == "1 werkzame persoon"] <- 1
    data$grootteklasse[data$gk == "2 werkzame personen"] <- 2
    data$grootteklasse[data$gk == "3 tot 5 werkzame personen"] <- 2
    data$grootteklasse[data$gk == "5 tot 10 werkzame personen"] <- 2
    data$grootteklasse[data$gk == "10 tot 20 werkzame personen"] <- 3
    data$grootteklasse[data$gk == "20 tot 50 werkzame personen"] <- 3
    data$grootteklasse[data$gk == "50 tot 100 werkzame personen"] <- 3
    data$grootteklasse[data$gk == "100 werkzame personen of meer"] <- 4
    data$grootteklasse <- factor(data$grootteklasse, levels=1:4, 
       labels = c("microbedrijf", "kleinbedrijf", "middenbedrijf", "grootbedrijf"))

    data$gk <- NULL
    data$sbi_naam <- NULL


    # aggregate over size class
    library(plyr)
    data <- ddply(data, c("jaar", "sbi", "grootteklasse"), function(d) {
        result <- d[1,]
        result$aantal <- sum(d$aantal)
        return(result)
      })



    # select years 2007-2010
    #data <- data[data$jaar > 2006 & data$jaar < 2011, ]

    # calculate all margins
    m <- names(data)[names(data) != "aantal"]
   
    margins <- data.frame()
    for (i in (seq_len(length(m))-1)) {
        c <- combn(m, i)
        for (j in seq_len(ncol(c))) {
            margin <- ddply(data, c[,j], function(d) {
                result <- d[1,]
                result[, m[!(m %in% c[,j])]] <- NA
                result$aantal <- sum(d$aantal)
                return(result)
            })
            margin$.id <- NULL
            margins <- rbind(margins, margin)
        }
    }

    # Change NA's in margins to TOTAL
    for (i in seq_along(margins)) {
        sel <- is.na(margins[, i])
        margins[sel, i] <- "TOTAL"
    }

    # Remove margins over jaar
    margins <- margins[margins$jaar != "TOTAL", ]

    # Add margins to data
    data <- rbind(data, margins)
    data$aantal <- as.numeric(data$aantal)
    return(data)
}


read_table <- function() {
    data <- read_aantallen()

    library(reshape)
    data <- melt(data, measure.vars="aantal")

    # remove sbi T and U
    data <- data[!(data$sbi == 'U' | data$sbi == 'T'), ]
    data$sbi <- factor(data$sbi)
    # change levels to numeric values
    data$jaar <- as.numeric(as.factor(data$jaar))
    data$grootteklasse <- as.numeric(factor(data$grootteklasse,
        levels=c("microbedrijf", "kleinbedrijf", "middenbedrijf", "grootbedrijf", "TOTAL")
    ))
    data$sbi <- as.numeric(data$sbi)

    return (data)
}



