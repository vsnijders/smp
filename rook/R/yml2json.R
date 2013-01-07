yml2json <- function(yml){
  require(yaml)
  data <- yaml.load_file(yml)
  
  require(rjson)
  toJSON(data)
}

#yml2json("rook/data/tables/arbeidsmarktparticipatie_meta.yml")