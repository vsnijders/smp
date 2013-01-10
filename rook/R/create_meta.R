
create_meta <- function(data, name = "Name missing", description = "", 
        pop_name = name, 
        pop_description = "") {
    dimensions <- names(data)[sapply(data, class) == "factor"]
    variables  <- names(data)[!(names(data) %in% dimensions)]
    meta <- list(name=name, description=description, dimensions = list(), 
        variables = list())
    for (dim in dimensions) {
        lvls <- levels(data[[dim]])
        cats <- lapply(lvls, function(l) {list(level=l, name=l, description="")})
        d <- list( name = dim, description="", categories = cats,
                   aggregate = lvls[length(lvls)], default = lvls[length(lvls)],
                   type = "categorical"
                 )
        if (dim %in% c("jaar","Jaar")){
          d$aggregate <- NULL
          d$type=c("categorical", "time")
        }
        meta$dimensions[[dim]] = d
    }
    names(meta$dimensions) <- dimensions
    for (var in variables) {
        meta$variables[[var]] = list(name = var, description="", type = "numeric", unit = "", 
            population = pop_name)
    }
    names(meta$variables) <- variables
    meta$populations <- list(pop_description)
    names(meta$populations) <- pop_name
    return(meta)
}


### testing
#create_meta(iris)

# convertmeta <- function(meta){
#   dimensions <- lapply(meta$dimensions, function(d){
#     d$categories <- lapply(d$levels, function(l){ list(level=l, name=l, description="")})
#   })
#   meta$dimensions <- dimensions
#   meta
# }
# 
# require(yaml)
# for (m in dir(".", "*.yaml", recursive=T)[1]){
#   print(m)
#   meta <- yaml.load_file(m)
#   meta <- convertmeta(meta)
#   #write(as.yaml(meta), m)
# }
