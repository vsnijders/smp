
library(Rook)
library(rjson)

# Check to see if the rook server is already started. If not, start it; if it is
# we will only update the rook application without starting the server
init_rook <- !exists("rook_server")
if (init_rook) {
  rook_server <- Rhttpd$new()
}

# Source all files in r directory
rfiles <- list.files("R", pattern="\\.[rR]$")
for (file in rfiles) source(paste0("R/", file))

# Construct the rook application
# - All image, css, html and js files are going to be passed on as is.
# - All files are located in the www folder
# - Map calls to r/*.r to rook applications that should already have been 
#   loaded
# - The default page is index.html
rook_server$add(name = "statmine", app = Builder$new(
  Static$new(urls = c("/css", "/images", "/js", "/.*\\.html$"), 
    root = "./www"),
  URLMap$new(
    "^/R" = ajaxify(list=c("link_tables",
                           "get_table", 
                           "gen_link", 
                           "list_tables",
                           "get_meta", 
                           "fetch", 
                           "get_data"
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

