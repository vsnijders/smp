<?php

  require('php/meta.php');

  $pdo = new PDO("sqlite:data/test.sqlite");
  $meta = get_meta($pdo, 3);

  print_r($meta);

?>
