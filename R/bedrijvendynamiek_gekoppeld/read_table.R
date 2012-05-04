
table_info <- function(id) {
    data.frame(
        id = id,
        name = "bedrijvendynamiek_gekoppeld",
        longname = "Bedrijvendynamiek; ontstaan en verdwijnen van bedrijven",
        description = "Deze tabel bevat cijfers over het ontstaan en verdwijnen van bedrijven uitgesplitst naar grootteklasse en SBI. De volgende typen gebeurtenissen worden onderscheiden: afsplitsen, fusie, geboorte, overname, sterfte en uiteenvallen.",
        url = ""
    )
}

read_aantallen <- function() {
    data <- read.csv2("bedrijvendynamiek_gekoppeld/aantallen.csv", header=FALSE)

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
    data <- data[data$jaar > 2006 & data$jaar < 2011, ]

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

    # Add margins to data
    data <- rbind(data, margins)
    return(data)
}

read_dynamiek <- function() {

    data <- read.csv2("bedrijvendynamiek_gekoppeld/dynamiek.csv")

    # change NA's in zeros
    for (i in 4:length(data)) {
        data[is.na(data[, i]), i] <- 0
    }
    names(data) <- c("jaar", "grootteklasse", "sbi", "effect", "afsplitsing", 
                    "fusie", "geboorte", "overname", "sterfte", "uiteenvallen")
    data$effect <- factor(data$effect, levels=1:2, 
                    labels=c("opvoering", "afvoering"))
    levels(data$grootteklasse) <- c("microbedrijf", "kleinbedrijf", "middenbedrijf",
                    "grootbedrijf")
    library(reshape2)
    data <- melt(data, id.var=c("jaar", "grootteklasse", "sbi", "effect"))

    # rename variables
    names(data)[5:6] <- c("type", "netto_verandering")

    # select years 2007-2010
    data <- data[data$jaar < 2011, ]

    # calculate all margins
    library(plyr)
    data$netto_verandering[data$effect == "afvoering"] <- - data$netto_verandering[data$effect == "afvoering"]
    m <- names(data)[names(data) != "netto_verandering"]
   
    margins <- data.frame()
    for (i in (seq_len(length(m))-1)) {
      c <- combn(m, i)
      for (j in seq_len(ncol(c))) {
          margin <- ddply(data, c[,j], function(d) {
              result <- d[1,]
              result[, !(m %in% c[,j])] <- NA
              result$netto_verandering <- sum(d$netto_verandering)
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

    # Add margins to data
    data <- rbind(data, margins)

    # Some combinations of year, size class, sbi are missing, fill these
    # with 0's
    data$netto_verandering <- as.numeric(data$netto_verandering)
    data <- dcast(
        melt(data, 
            id.vars=c("jaar", "grootteklasse", "sbi", "effect", "type")), 
        jaar + grootteklasse + sbi + effect + type ~ variable, 
        drop=FALSE, fill=T)

    return(data)
    
}


read_table <- function() {
    dynamiek <- read_dynamiek()
    aantallen <- read_aantallen()

    data <- merge(dynamiek, aantallen, all.x=FALSE, all.y=FALSE)
    data$relatieve_verandering <- round(
        as.numeric(data$netto_verandering)/as.numeric(data$aantal)*100, 1)

    data <- melt(data, measure.vars=c("netto_verandering", "aantal", "relatieve_verandering"))

    # remove sbi T and U
    data <- data[!(data$sbi == 'U' | data$sbi == 'T'), ]
    data$sbi <- factor(data$sbi)
    # change levels to numeric values
    data$jaar <- as.numeric(as.factor(data$jaar))
    data$grootteklasse <- as.numeric(factor(data$grootteklasse,
        levels=c("microbedrijf", "kleinbedrijf", "middenbedrijf", "grootbedrijf", "TOTAL")
    ))
    data$sbi <- as.numeric(data$sbi)
    data$effect <- as.numeric(factor(data$effect))
    data$type <- as.numeric(factor(data$type,
        levels=c('afsplitsing', 'fusie', 'geboorte', 'overname', 'sterfte', 'uiteenvallen', 'TOTAL')
    ))

    return (data)
}



