

table_info <- function(id) {
    data.frame(
        id = id,
        name = "labourdynamics",
        longname = "Labourmarket dynamics; changes in labourmarketposition",
        description = "This table contains quarterly figures on the labourmarket mobility of persons
        ages between 15 and 65 years in The Netherlands. It contains information on the labourmarket
        position at the beginning of the survey and that three months later. ",
        url = "http://statline.cbs.nl/StatWeb/publication/?DM=SLNL&PA=80220NED&D1=a&D2=a&D3=0-9,13-17&D4=a&STB=G3,G2,T,G1&VW=T"
    )
}


read_table <- function() {
    data <- read.csv2("labourmarket/labourmarket_mobility.csv")

    names(data) <- c("quarter", "personal_characteristics", "position_begin", "position_end", "variable", "value")

    data$variable <- "number_of_persons"

    data$quarter <- gsub("e kwartaal", "", data$quarter)
    data$quarter <- gsub(" ", "-", data$quarter)

    levels(data$personal_characteristics) <- c(
        "Job level: elementary",
        "Job level: higher",
        "Job level: lower",
        "Job level: middle",
        "Job level: scientific",
        "Gender: male",
        "TOTAL",
        "Gender: female",
        "Age: 15-25 years",
        "Age: 25-45 years",
        "Age: 45-65 years",
        "Education level: higher",
        "Education level: lower",
        "Education level: middle",
        "Education level: unknown"
        )

    levels(data$position_begin) <- c(
        "non labourforce",
        "TOTAL",
        "unemployed",
        "employed")
    levels(data$position_end) <- c(
        "non labourforce",
        "TOTAL",
        "unemployed",
        "employed")

    data$value[data$value == '.'] <- NA
    data$value <- as.numeric(as.character(data$value))

    # convert factors to numeric
    data$quarter <- as.numeric(as.factor(data$quarter))
    data$personal_characteristics <- as.numeric(factor(data$personal_characteristics, 
        levels=c(
        "Job level: elementary",
        "Job level: lower",
        "Job level: middle",
        "Job level: higher",
        "Job level: scientific",
        "Gender: male",
        "Gender: female",
        "Age: 15-25 years",
        "Age: 25-45 years",
        "Age: 45-65 years",
        "Education level: lower",
        "Education level: middle",
        "Education level: higher",
        "Education level: unknown",
        "TOTAL")))
    data$position_begin <- as.numeric(factor(data$position_begin, 
        levels=c( "employed", "unemployed", "non labourforce", "TOTAL")))
    data$position_end <- as.numeric(factor(data$position_end, 
        levels=c( "employed", "unemployed", "non labourforce", "TOTAL")))

    return(data)
}

