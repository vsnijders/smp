rm_tmp <- function(tmp_dir="data/tmp"){
  unlink(tmp_dir, force=TRUE, recursive=TRUE)
  dir.create(tmp_dir, recursive=TRUE)
  TRUE
}