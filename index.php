<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>StatMine</title>

    <!-- webpage icon -->
    <link type="text/css" href="css/ui.css" rel="stylesheet" />
    <link rel="shortcut icon" href="img/favicon.ico" type="image/vnd.microsoft.icon" />
    <link rel="icon" href="img/favicon2.png" type="image/png" />

    <!-- jQuery includes -->
    <link type="text/css" href="css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" />
    <script type="text/javascript" src="js/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.8.17.custom.min.js"></script>

  </head>
  <body>
   
  <header>
    <h1><a href="index.php">StatMine</a></h1>
  </header>
  <div id="navigation-container">
    <div id="navigation">
      <ul>
        <li><a href="index.php">Tables</a></li>
        <li><a href="#">Help</a></li>
      </ul>
    </div>
  </div>

  <article>
    <div class="menu">
    </div>

    <div class="content">

<?php
  require_once("php/meta.php");

  $pdo = new PDO("sqlite:data/test.sqlite");
  $r = $pdo->query("SELECT * FROM tables");
  
  while ($row = $r->fetch()) {
    $meta = $META[$row['name']];
    echo '<div class="table">';
    echo '<h2><a href="ui.php?id=' . $row['id'] . '">' .  $meta['longname'] . '</a></h2>';
    echo '<p>' . $meta['description'] . '</p>';
    if (isset($meta['url']) && $meta['url'] != '') {
      echo '<p class="tableoptions">';
      if (!is_array($meta['url'])) $meta['url'] = array($meta['url']);
      foreach($meta['url'] as $url) echo '<a href="' . $url . '">StatLine</a> ';
      echo '</p>';
    }
    echo '</div>';
  }

?>

    </div>
  </article>

  <footer>
  </footer>

  </body>
</html>


