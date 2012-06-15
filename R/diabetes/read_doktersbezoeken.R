
#Deze tabel toont per diagnose(groep) het aantal personen dat gedurende
#het
#verslagjaar een of meer zorgepisodes heeft gehad, geregistreerd door de
#huisarts waar de persoon staat ingeschreven. De diagnoses zijn gecodeerd

#volgens de International Classification of Primary Care (ICPC-1).
#De aantallen worden uitgedrukt per 1000 personen en uitgesplitst naar
#leeftijd en geslacht.

read_doktersbezoeken <- function() {
    data <- read.csv2("diabetes/doktersbezoeken_diabetes_inkomen.csv")

    data$inkomensgroep <- factor(data$inkomensgroep, levels=c( 
        "1e 10%-inkomensgroep (laag inkomen)",
        "2e 10%-inkomensgroep",
        "3e 10%-inkomensgroep",
        "4e 10%-inkomensgroep",
        "5e 10%-inkomensgroep",
        "6e 10%-inkomensgroep",
        "7e 10%-inkomensgroep",
        "8e 10%-inkomensgroep",
        "9e 10%-inkomensgroep",
        "10e 10%-inkomensgroep (hoog inkomen)",
        "Totaal alle inkomens"))
    data$inkomensgroep <- as.numeric(data$inkomensgroep)

    data$geslacht <- factor(data$geslacht, levels=c(
        "Mannen",
        "Vrouwen",
        "Totaal mannen en vrouwen"))
    data$geslacht <- as.numeric(data$geslacht)

    data$leeftijd <- factor(data$leeftijd, levels=c(
        "0 tot 15 jaar",
        "15 tot 30 jaar",
        "30 tot 45 jaar",
        "45 tot 60 jaar",
        "60 tot 75 jaar",
        "75 jaar of ouder",
        "Totaal leeftijd"))
    data$leeftijd <- as.numeric(data$leeftijd)

    data$aantal_patienten <- as.numeric(as.character(data$aantal_patienten))



    data2 <- read.csv2("diabetes/doktersbezoeken_diabetes.csv")

    data2$geslacht <- factor(data2$geslacht, levels=c(
        "Mannen",
        "Vrouwen",
        "Totaal mannen en vrouwen"))
    data2$geslacht <- as.numeric(data2$geslacht)

    data2$leeftijd <- factor(data2$leeftijd, levels=c(
        "0 tot 15 jaar",
        "15 tot 30 jaar",
        "30 tot 45 jaar",
        "45 tot 60 jaar",
        "60 tot 75 jaar",
        "75 jaar of ouder",
        "Totaal leeftijd"))
    data2$leeftijd <- as.numeric(data2$leeftijd)

    data2$inkomensgroep <- 11
    data2$aantal_patienten2 <- data2$aantal_patienten
    data2$aantal_patienten <- NULL

    data3 <- merge(data, data2, by=c("jaar", "inkomensgroep", "geslacht", "leeftijd"),
        all.x=TRUE, all.y=TRUE)

    data3$aantal_patienten[is.na(data3$aantal_patienten)] <- data3$aantal_patienten2[is.na(data3$aantal_patienten)]
    data3$aantal_patienten2 <- NULL

    data3$jaar <- factor(data3$jaar)
    data3$jaar <- as.numeric(data3$jaar)

    return(data3)
}

