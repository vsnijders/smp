
table_info <- function(id) {
    data.frame(
        id = id,
        name = "bedrijvendynamiek",
        longname = "Bedrijvendynamiek; ontstaan en verdwijnen van bedrijven",
        description = "Deze tabel bevat cijfers over het ontstaan en verdwijnen van bedrijven uitgesplitst naar grootteklasse en SBI. De volgende typen gebeurtenissen worden onderscheiden: afsplitsen, fusie, geboorte, overname, sterfte en uiteenvallen.",
        url = ""
    )
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



