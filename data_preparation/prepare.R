for (p in dir(".", "prepare_.*R$", recursive=TRUE)){
  cat("Executing '", p ,"': ")
  source(p, chdir=TRUE)
  cat("done.\n")
}