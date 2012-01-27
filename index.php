<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SMP - tables</title>
    <link rel="stylesheet" href="css/smp.css" type="text/css"/>
    <link rel="shortcut icon" href="img/favicon.ico" type="image/vnd.microsoft.icon" />
    <link rel="icon" href="img/favicon2.png" type="image/png" />
  </head>

  <body>
    <header>
        <h1><a href="<?php echo $_SERVER['PHP_SELF'];?>">SMP</a> - tables</h1>
    </header>
    <article>

<?php
  $pdo = new PDO("sqlite:data/test.sqlite");
  $r = $pdo->query("SELECT * FROM tables");

  while ($row = $r->fetch()) {
    echo '<div class="table">';
    echo '<h2>' . $row['longname'] . '</h2>';
    echo '<p>' . $row['description'] . '</p>';
    echo '<p class="tableoptions"><a href="view.php?id=' . $row['id'] . '">view</a></p>';
    echo '</div>';
  }
?>

    </article>


</body>
</html>

