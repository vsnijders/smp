<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>SMP - view</title>
    <link rel="stylesheet" href="ccs/smp.css" type="text/css"/>
  </head>

  <body>
<?php
  require_once('php/table.php');

  $id = 3;

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
  $vars = array("gender", "age" , "variable");
  $values = array();

  for ($i = 0; $i < sizeof($vars); $i++) {
    $query = "SELECT {$vars[$i]} FROM {$table['name']} GROUP BY {$vars[$i]}";
    $dta = $pdo->query($query);
    $vals = array();
    $j = 0;
    while ($row = $dta->fetch()) {
      $vals[$j] = $row[0];
      $j++;
    }
    $values[$i] = $vals;
  }

  $filter = array();
  echo "<form action=\"{$_SERVER['PHP_SELF']}\" method=\"post\">";
  for ($i = 0; $i < sizeof($vars); $i++) {
    $f1 = array();
    echo "<p><b>{$vars[$i]}</b><br>\n";
    foreach ($values[$i] as $value) {
      $name = $vars[$i] . "_" . $value;
      $checked = "";
      if (isset($_POST[$name]) && $_POST[$name] == "on") {
        $f1[] = $vars[$i] . " = '" . $value . "'";
        $checked ="checked=\"checked\"";
      }
      echo "<input type=\"checkbox\" name=\"{$name}\" {$checked}>{$value}</input><br>\n";
    }
    echo "</p>\n";
    if (sizeof($f1)) {
      $filter[] = implode(" OR ", $f1);
    }
  }

  if (isset($_POST['shape'])) {
    echo "<input type=\"text\" name=\"shape\" value=\"{$_POST['shape']}\"><br>\n";
  } else {
    echo "<input type=\"text\" name=\"shape\"><br>\n";
  }
  echo "<input type=\"submit\" name=\"filter\">\n";
  echo "</form>";
?>


<?php
  // FILTER
  $where = "";
  if (sizeof($filter) > 0) 
    $where = ' WHERE ' . '(' . implode(") AND (", $filter) . ')';
  // END FILTER

  $rowvars = $vars;
  $colvars = array();
  if (isset($_POST['shape']) && sizeof($_POST['shape'])) {
    $leftright = explode('~', $_POST['shape']);
    if (sizeof($leftright) == 2) {
      $rowvars = explode('+', $leftright[0]);
      $colvars = explode('+', $leftright[1]);
      for ($i = 0; $i < sizeof($rowvars); $i++) $rowvars[$i] = trim($rowvars[$i]);
      for ($i = 0; $i < sizeof($colvars); $i++) $colvars[$i] = trim($colvars[$i]);
      // TODO check if all variables are there: if not add them to columns
    } else {
    }
  }
  
  $order = implode(', ', $rowvars);
  if (sizeof($colvars)) $order = $order . ', ' . implode(', ', $colvars);
  if (sizeof($order)) $order = ' ORDER BY ' . $order;

  $query = "SELECT * FROM {$table['name']}" . $where . $order;
  echo "<p>" . $query . "</p>";
  $dta = $pdo->query($query);

  /*$i = 1;
  $previous = array();
  for ($j = 0; $j < sizeof($rowvars); $j++) $previous[] = '';
  echo "<table>\n";
  while ($row = $dta->fetch(PDO::FETCH_ASSOC)) {
    $same = true;
    for ($j = 0; $j < sizeof($rowvars); $j++) {
      if ($row[$rowvars[$j]] != $previous[$j]) {
        $same = false;
        break;
      }
    }
    
    if (!$same) {
      if ($i > 1) echo "</tr>\n";
      echo "<tr>\n";
      for ($j = 0; $j < sizeof($rowvars); $j++) {
        echo "<td>" . $row[$rowvars[$j]] . "</td>\n";
        $previous[$j] = $row[$rowvars[$j]];
      }
    }

    echo "<td>" . $row['value'] . "</td>\n";

    $i++;
  }
  echo "</tr>\n";
  echo "</table>\n";*/

  $previous = array_fill(0, sizeof($rowvars), '');
  $tablerow = array();
  $table = new Table();
  while ($row = $dta->fetch(PDO::FETCH_ASSOC)) {
    $same = true;
    for ($j = 0; $j < sizeof($rowvars); $j++) {
      if ($row[$rowvars[$j]] != $previous[$j]) {
        $same = false;
        break;
      }
    }
    
    if (!$same) {
      if (sizeof($tablerow)) $table->add_row($tablerow);
      $tablerow = array();
      for ($j = 0; $j < sizeof($rowvars); $j++) {
        $tablerow[]   = $row[$rowvars[$j]];
        $previous[$j] = $row[$rowvars[$j]];
      }
    }
    $tablerow[] = $row['value'];
    $i++;
  }

  print_table($table);
?>

  </article>

</body>
</html>

