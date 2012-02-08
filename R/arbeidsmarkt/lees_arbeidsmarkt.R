readtable4 <- function(){
  data <- read.csv2("data/Arbeidsmarkt.csv", na=".")
  url <- "http://statline.cbs.nl/StatWeb/publication/?DM=SLNL&PA=80220NED&D1=a&D2=a&D3=a&D4=a&STB=T,G1,G2,G3&VW=D"
  
  data <- within(data,{ 
    levels(Van) <- c("niet-beroeps","potentieel", "werkloos", "werkzaam")
    levels(Naar) <- c("werkzaam", "niet-beroeps","potentieel", "werkloos")
    Van <- as.factor(Van)
    Naar <- as.factor(Van)
    sp <- strsplit(as.character(data$Persoonskenmerken), ":\\s*", perl=TRUE)
    vars <- t(sapply(sp, function(i) c(var=i[1], val=i[2])))
    for (var in unique(vars[,1])){
      val <- ifelse(var == vars[,1], vars[,2], NA) 
      assign(var, as.factor(val))
    }
    Waarde <- Waarde * 1000
    Persoonskenmerken <- NULL
    Waarde.eenheid <- NULL
    sp <- NULL
    vars <- NULL
    var <- NULL
    val <- NULL
    #TODO translate
  })
  #str(data)
  data
}

data <- readtable4()
str(data)