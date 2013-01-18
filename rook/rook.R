
library(Rook)
library(rjson)
library(yaml)

# Check to see if the rook server is already started. If not, start it; if it is
# we will only update the rook application without starting the server
init_rook <- !exists("rook_server")
if (init_rook) {
  rook_server <- Rhttpd$new()
}

# Source all files in r directory
rfiles <- list.files("R", pattern="\\.[rR]$")
for (file in rfiles) source(paste0("R/", file))

# convert translation.yml files into json
languages <- list.files("www/locales", pattern="\\.yml$"
                      , recursive=TRUE, full.names=TRUE)
cat("**********\n")
for (lng in languages){
  l <- yaml.load_file(lng)
  file <- sub("yml","json", lng)
  cat("Writing ", file)
  write(toJSON(l), file=file)
  cat(".\n")
}

# Construct the rook application
# - All image, css, html and js files are going to be passed on as is.
# - All files are located in the www folder
# - Map calls to r/*.r to rook applications that should already have been 
#   loaded
# - The default page is index.html
rook_server$add(name = "statmine", app = Builder$new(
  Static$new(urls = c("/css", "/images", "/js", "/locales","/.*\\.html$"), 
    root = "./www"),
  URLMap$new(
    "^/R" = ajaxify(list=c("link_tables",
                           "get_table", 
                           "gen_link", 
                           "list_tables",
                           "get_meta", 
                           "fetch", 
                           "get_data", 
                           "rm_tmp"
                           )),
    ".*" = Redirect$new("/index.html")
  )
))

# If the rook server was not already started: start it now and open the 
# application
if (init_rook) {
  rook_server$start(quiet=TRUE)
  rook_server$browse("statmine")
}