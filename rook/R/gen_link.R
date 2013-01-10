gen_link <- function(table1, table2) {
  
  # Read all necessary data
  t1 <- get_table(table1)
  t1_meta <- t1$meta
  t1      <- t1$data
  t2      <- get_table(table2)
  t2_meta <- t2$meta
  t2      <- t2$data
  
  link <- list()
  
  link$newtable = paste(table1, table2, sep=".")
  link$table1 = table1
  link$meta1 = t1_meta
  link$table2 = table2
  link$meta2 = t2_meta
  
  link$dimensions = matchdims(t1_meta$dimensions,t2_meta$dimensions)
  
  # link$variables???
  
  return(link)
}

matchdims <- function(dims1, dims2){
  dims <- list()
  
  nms1 <- sapply(dims1, function(d) d$name)
  nms2 <- sapply(dims2, function(d) d$name)
  
  # can be made smarter, e.g. with agrep
  i2 <- match(nms1, nms2, nomatch=0)
  
  i1 <- which(i2 != 0)
  i2 <- i2[i1]
  
  dims <- mapply( function(d1, d2){
            list( dimension1 = names(dims1)[d1]
                , dimension1_name = nms1[[d1]]
                , dimension2 = names(dims2)[d2]
                , dimension2_name = nms2[[d2]]
                , categories = matchcats(dims1[[d1]]$categories, dims2[[d2]]$categories)
                ) 
        }
        ,i1, i2,SIMPLIFY=FALSE)
  
  dims1.u <- lapply(names(dims1)[-i1], function(d){
    list( dimension1 = d
        , dimension1_name = nms1[[d]]
        , categories = lapply(dims1[[d]]$categories, function(c){list(category1=c$level, category1_name=c$name)})
        )
  })
  
  dims2.u <- lapply(names(dims2)[-i2], function(d){
    list( dimension2 = d
        , dimension2_name = nms2[[d]]
        , categories = lapply(dims2[[d]]$categories, function(c){list(category2=c$level, category2_name=c$name)})
    )
  })
  
  dims <- append(dims, dims1.u)
  dims <- append(dims, dims2.u)
  names(dims) <- NULL
  dims
}

matchcats <- function(cats1, cats2){
  cats <- list()

  nms1 <- sapply(cats1, function(c) c$name)
  nms2 <- sapply(cats2, function(c) c$name)
  
  i2 <- match(nms1, nms2, nomatch=0)
  i1 <- which(i2>0)
  i2 <- i2[i1]
  
  cats <- c(cats, mapply( function(c1, c2){
     list( category1=cats1[[c1]]$level
         , category1_name=nms1[c1]
         , category2=cats2[[c2]]$level
         , category2_name=nms2[c2]
         , include=TRUE
         )
  }, i1, i2, SIMPLIFY=FALSE))
  
  cats <- c(cats, lapply(cats1[-i1], function(c1){
                list(category1=c1$level, category1_name=c1$name)
           }))
  
  cats <- c(cats, lapply(cats2[-i2], function(c2){
    list(category2=c2$level, category2_name=c2$name)
  }))
  cats
}

# library(rjson)
# gen_link("slachtoffer", "crimi") -> l
# link_tables(link=l)
# l
# toJSON(l)
