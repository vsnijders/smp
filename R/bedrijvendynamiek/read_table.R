
table_info <- function(id) {
    data.frame(
        id = id,
        name = "bedrijvendynamiek",
        longname = "Bedrijvendynamiek; ontstaan en verdwijnen van bedrijven",
        description = "Deze tabel bevat cijfers over het ontstaan en verdwijnen van bedrijven uitgesplitst naar grootteklasse en SBI. De volgende typen gebeurtenissen worden onderscheiden: afsplitsen, fusie, geboorte, overname, sterfte en uiteenvallen.",
        url = ""
    )
}

read_aantallen <- function() {
  data <- read.csv2("bedrijvendynamiek/aantallen.csv", header=FALSE)

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

  # calculate all margins
  library(plyr)
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
        cat("calculating margin: ", paste(c[,j], collapse=", "), "\n")
        print(margin)
        margins <- rbind(margins, margin)
    }
  }

  # calculate margins
  library(plyr)
  m1 <- ddply(data, "grootteklasse", function(d) {
        r <- d[1,]
        r$aantal <- sum(d$aantal)
        return(r)
      })
  m1$sbi <- "TOTAL"
  m2 <- ddply(data, "sbi", function(d) {
        r <- d[1,]
        r$aantal <- sum(d$aantal)
        return(r)
      })
  m2$grootteklasse <- "TOTAL"

  return(data)
}


read_table <- function() {
    data <- read.csv2("bedrijvendynamiek/dynamiek.csv")

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

    # calculate all margins
    library(plyr)
    data$value[data$effect == "afvoering"] <- - data$value[data$effect == "afvoering"]
    m <- names(data)[names(data) != "value"]
   
    margins <- data.frame()
    for (i in (seq_len(length(m))-1)) {
      c <- combn(m, i)
      for (j in seq_len(ncol(c))) {
          margin <- ddply(data, c[,j], function(d) {
              result <- d[1,]
              result[, !(m %in% c[,j])] <- NA
              result$value <- sum(d$value)
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



