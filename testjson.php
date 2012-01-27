<?php
  require_once('php/table.php');
  require_once('php/read_table.php');
  require_once('php/asJSON.php');
  
  if (!isset($_GET['id'])) die("ID not set");
  $id = $_GET['id'];

  $pdo = new PDO("sqlite:data/test.sqlite");
  $r = $pdo->query("SELECT * FROM tables WHERE id=$id");
  $table = $r->fetch();
  asJSON($table);
?>