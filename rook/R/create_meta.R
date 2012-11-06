
create_meta <- function(data, name=deparse(substitute(data)), description="", population="") {
    dimensions <- names(data)[sapply(data, class) == "factor"]
    variables  <- names(data)[!(names(data) %in% dimensions)]
    
    meta <- list( name = name
                , description = description
                , dimensions = list()
                , variables = list()
                , populations = list()
                )
    
    for (dim in dimensions) {
        lvls <- levels(data[[dim]])
        meta$dimensions[[dim]] = list(name = dim, levels = lvls,
            default = lvls[length(lvls)])
    }
    names(meta$dimensions) <- dimensions
    for (var in variables) {
        meta$variables[[var]] = list(name = var, type="numeric", unit="#", population="")
    }
    names(meta$variables) <- variables

    return(meta)
}

