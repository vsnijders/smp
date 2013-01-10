for (p in dir(".", "prepare_.*R$", recursive=TRUE)){
  source(p, chdir=TRUE)
}