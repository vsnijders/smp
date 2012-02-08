
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
}



