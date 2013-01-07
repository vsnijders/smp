
create_meta <- function(data, name = "Name missing", description = "", 
        pop_name = name, 
        pop_description = "") {
    dimensions <- names(data)[sapply(data, class) == "factor"]
    variables  <- names(data)[!(names(data) %in% dimensions)]
    meta <- list(name=name, description=description, dimensions = list(), 
        variables = list())
    for (dim in dimensions) {
        lvls <- levels(data[[dim]])
        d <- list( name = dim, description="", levels = lvls,
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

