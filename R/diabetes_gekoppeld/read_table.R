
# huisartspatienten.csv
# Personen naar door de huisarts geregistreerde diagnose; leeftijd, geslacht
#
#Deze tabel toont per diagnose(groep) het aantal personen dat gedurende het
#verslagjaar een of meer zorgepisodes heeft gehad, geregistreerd door de
#huisarts waar de persoon staat ingeschreven. De diagnoses zijn gecodeerd
#volgens de International Classification of Primary Care (ICPC-1).
#De aantallen worden uitgedrukt per 1000 personen en uitgesplitst naar
#leeftijd en geslacht.
#
# http://statline.cbs.nl/StatWeb/publication/default.aspx?DM=SLNL&PA=80193NED&D1=137&D2=a&D3=0-17&D4=0&D5=a&HDR=G3&STB=T%2cG4%2cG1%2cG2&VW=D
#



# gezo.csv
# Gezondheid, leefstijl, zorggebruik; t/m 2009.
#
# Deze tabel bevat het merendeel van de uitkomsten van de jaarlijkse
#module gezondheidsenquête uit het Permanent LeefSituatie Onderzoek
#(POLS).
#Het CBS houdt deze enquête met het doel een zo volledig mogelijk
#overzicht te geven van ontwikkelingen in de gezondheid, medische
#consumptie, leefstijl en het preventieve gedrag van de Nederlandse
#bevolking.
#Er worden onder andere vragen gesteld over algemene gezondheid,
#chronische aandoeningen, lichamelijke beperkingen, contacten met
#huisarts, fysiotherapeut, specialist en tandarts, ziekenhuisopnamen,
#medicijngebruik, roken, alcoholgebruik, lichamelijke activiteit,
#griepvaccinatie, cervix uitstrijkjes en mammografieën.
#In de tabel zijn de gegevens uit te splitsen naar de volgende
#kenmerken:
#
# http://statline.cbs.nl/StatWeb/publication/default.aspx?DM=SLNL&PA=03799&D1=139-141%2c267-268%2c270-271&D2=27-44&D3=0&D4=1-9&HDR=G2%2cT&STB=G1%2cG3&VW=D


table_info <- function(id) {
    data.frame(
        id = id,
        name = "diabetes_linked",
        longname = "",
        description = "",
        url = ""
    )
}


read_table <- function() {

    source("diabetes_gekoppeld/read_geneesmiddelen.R")
    source("diabetes_gekoppeld/read_gezo.R")
    source("diabetes_gekoppeld/read_huisartspatienten.R")

    # read data
    data_genees <- read_geneesmiddelen()
    data_gezo <- read_gezo()
    data_huis <- read_huisartspatienten()

    # merge data
    data <- merge(data_genees, data_gezo, by=c("jaar", "geslacht", "leeftijd"),
        all.x=TRUE, all.y=TRUE)

    data <- merge(data, data_huis, by=c("jaar", "geslacht", "leeftijd"),
        all.x=TRUE, all.y=TRUE)

    # convert factors to int
    data$jaar <- as.numeric(as.factor(data$jaar))

    data$geslacht <- as.numeric(factor(data$geslacht, levels=c(
            "Man", "Vrouw", "Totaal"
        )))
    data$leeftijd <- as.numeric(factor(data$leeftijd, levels=c(
            "0 tot 25", "25 tot 35", "35 tot 45", "45 tot 55", "55 tot 65", "65 tot 75",
            "75+", "Totaal"
        )))

    # transform to long format
    library(reshape2)
    data <- melt(data, id.vars=c("jaar", "geslacht", "leeftijd"))

    return(data)
}

