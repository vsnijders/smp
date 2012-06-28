
table_info <- function(id) {
    data.frame(
        id = id,
        name = "banenwerknemers",
        longname = "",
        description = "",
        url = "http://statline.cbs.nl/StatWeb/publication/?PA=81402ned"
    )
}

read_table <- function() {
  data <- read.csv2("R/banenvanwerknemers/Banen_van_werknemers.csv")
  
  # to numeric columns and x 1000 (data is in 1000...)
  data[c(4:5)] <- lapply(data[c(4:5)], function(x) 1000 * as.numeric(as.character(x)))
  
  #dump_levels(data)
  data <- alter_levels(data)
  
  data
}

alter_levels <- function(data){
  vars <- names(data)[sapply(data, is.factor)]
  filenames <- paste("R/banenvanwerknemers/L_1_", vars,".csv",sep="")
  names(filenames) <- vars
  for (v in vars){
    l <- read.csv2(file=filenames[v])
    levels(data[[v]]) <- l[[2]]
  }  
  data
}

process_regions <- function(regions){
  regions <- read.csv2("R/banenvanwerknemers/L_1_Regio.csv")
  
  ext <- ".+\\((\\w+)\\)"
  l <- grepl(ext, regions[[1]])
  type <- gsub(".+\\((\\w+)\\)","\\1", regions[[1]], perl=TRUE)
  type[!l] <- "GM"
  type[type == "gemeente"] <- "GM"
  type
}

dump_levels <- function(data){
  vars <- names(data)[sapply(data, is.factor)]
  filenames <- paste("R/banenvanwerknemers/L_1_", vars,".csv",sep="")
  names(filenames) <- vars
  for (v in vars){
    l <- levels(data[[v]])
    write.csv2(data.frame(oldlevel=l,level=l), file=filenames[v], row.names=FALSE)
  }
}



