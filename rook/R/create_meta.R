
create_meta <- function(data) {
    dimensions <- names(data)[sapply(data, class) == "factor"]
    variables  <- names(data)[!(names(data) %in% dimensions)]
    meta <- list(dimensions = list(), variables = list())
    for (dim in dimensions) {
        lvls <- levels(data[[dim]])
        meta$dimensions[[dim]] = list(name = dim, levels = lvls,
            default = lvls[length(lvls)])
    }
    names(meta$dimensions) <- dimensions
    for (var in variables) {
        meta$variables[[var]] = list(name = var)
    }
    names(meta$variables) <- variables

    return(meta)
}

