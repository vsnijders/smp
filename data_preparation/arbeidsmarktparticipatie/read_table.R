
table_info <- function(id) {
    data.frame(
        id = id,
        name = "participation",
        longname = "",
        description = "",
        url = ""
    )
}


read_table <- function() {

    data <- read.csv2("arbeidsmarktparticipatie/arbeidsmarktparticipatie.csv")

    data$geslacht <- as.numeric(factor(data$geslacht, levels=c('man', 'vrouw')))
    data$generatie <- as.numeric(factor(data$generatie, levels=c(
        "1906-1910", "1911-1915", "1916-1920", "1921-1925", "1926-1930", "1931-1935", "1936-1940",
        "1941-1945", "1946-1950", "1951-1955", "1956-1960", "1961-1965", "1966-1970", "1971-1975",
        "1976-1980", "1981-1985", "1986-1990")))

    library(reshape2)
    data <- melt(data, id.vars=c("geslacht", "generatie"))
    data$leeftijd <- as.integer(gsub("^X", "", data$variable)) - 15
    data$variable <- "participatie"

    data <- data[ , c("geslacht", "generatie", "leeftijd", "variable", "value")]
    meta <- read_meta()
    
    data$variable <- meta$name
    
    names(data) <- meta$slices

    for (n in names(meta$variables)){
      v <- meta$variables[[n]]
      print(list(name=n, v=v))
      if (v$type == "factor")
        browser()
        levels(data[[n]]) <- v$categories
        print(data[[n]])
    }
    
    return(data)
}

read_meta <- function(){
  require(yaml)
  meta <- yaml.load_file("arbeidsmarktparticipatie/meta.yaml")
  meta
}

dump_meta <- function(data){
  require(yaml)
  # TODO write meta information from a data.frame
}

### testing 
#read_meta()
dat <- read_table()
