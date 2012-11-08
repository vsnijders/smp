
create_meta <- function(data, name = "Name missing", description = "", 
        pop_name = name, 
        pop_description = "No population description availabla") {
    dimensions <- names(data)[sapply(data, class) == "factor"]
    variables  <- names(data)[!(names(data) %in% dimensions)]
    meta <- list(name=name, description="", dimensions = list(), 
        variables = list())
    for (dim in dimensions) {
        lvls <- levels(data[[dim]])
        meta$dimensions[[dim]] = list(name = dim, levels = lvls,
            aggregate = lvls[length(lvls)], default = lvls[length(lvls)],
            type = "categorical")
    }
    names(meta$dimensions) <- dimensions
    for (var in variables) {
        meta$variables[[var]] = list(name = var, type = "numeric", unit = "", 
            population = pop_name)
    }
    names(meta$variables) <- variables
    meta$populations <- list(pop_description)
    names(meta$populations) <- pop_name
    return(meta)
}

