

read_geneesmiddelen <- function() {

    data <- read.csv2("diabetes_geneesmiddelen/geneesmiddelen_diabetes.csv", dec='.')


    # remove columns with medication type (which is the same for all records)
    data$tmp <- NULL

    data$herkomst <- as.numeric(factor(data$herkomst, levels=c(
        "Totaal",
        "Autochtoon",
        "Totaal allochtoon",
        "Westerse allochtoon",
        "Totaal niet-westerse allochtoon",
        "Marokko",
        "Turkije",
        "Suriname",
        "(voormalige) Nederlandse Antillen, Aruba",
        "Overig niet-westers",
        "Allochtoon, 1e generatie",
        "Allochtoon, 2e generatie")))

    data$geslacht <- as.numeric(factor(data$geslacht, levels=c(
        "Mannen",
        "Vrouwen",
        "Totaal Mannen en vrouwen")))

    data$leeftijd <- as.numeric(factor(data$leeftijd, levels=c(
        "0 tot 15 jaar",
        "15 tot 25 jaar",
        "25 tot 35 jaar",
        "35 tot 45 jaar",
        "45 tot 55 jaar",
        "55 tot 65 jaar",
        "65 tot 75 jaar",
        "75 of ouder",
        "Totaal alle leeftijden")))

    data$jaar <- as.numeric(as.factor(data$jaar))

    return(data)
}

