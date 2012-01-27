<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SMP - view</title>
    <link rel="stylesheet" href="css/smp.css" type="text/css"/>
  </head>

  <body>
<?php
  if (!isset($_GET['id'])) die("ID not set");
  $id = $_GET['id'];

  $pdo = new PDO("sqlite:data/test.sqlite");
  $r = $pdo->query("SELECT * FROM tables WHERE id=$id");
  $table = $r->fetch();

?>
    <header>
        <h1><a href="index.php">SMP</a> - 
          <?php echo $table['longname'];?></h2>
        <p><a href="index.php">tables</a></p>
    </header>
    <article>


<?php
  $query = "SELECT * FROM {$table['name']}";
  $dta = $pdo->query($query);

  $i = 1;
  echo "<table>\n";
  while ($row = $dta->fetch(PDO::FETCH_ASSOC)) {
    if ($i == 1) {
      echo "<thead>\n";
      echo "<tr>\n";
      foreach ($row as $col => $val) {
        echo "<th>" . $col . "</th>\n";
      }
      echo "</tr>\n";
      echo "</thead>\n";
      echo "<tbody>\n";
    }
    if ($i % 2 == 1) echo "<tr class=\"odd\">\n";
    else if ($i % 10 == 0) echo "<tr class=\"ten\">\n";
    else echo "<tr>\n";
    foreach ($row as $val) {
      echo "<td>" . $val . "</td>\n";
    }
    echo "</tr>\n";
    $i++;
    if ($i > 100) {
      $ncol = sizeof($row);
      echo "<tr><td colspan=\"$ncol\">Showing only the first 100 rows</td></tr>\n";
      break;
    }
  }
  echo "</tbody>\n";
  echo "</table>\n";
?>

  </article>

</body>
</html>

