<?php

  function samegroup($a, $b, $vars) {
    foreach ($vars as $var) {
      if (!isset($a[$var])) return false;
      if (!isset($b[$var])) return false;
      if ($a[$var] != $b[$var]) return false;
    }
    return true;
  }

  function read_table($pdo, $tablename, $rowvars, $colvars, $where) {
    $order = implode(', ', $rowvars);
    if (sizeof($colvars)) $order = $order . ', ' . implode(', ', $colvars);
    if (sizeof($order)) $order = ' ORDER BY ' . $order;
    $query = "SELECT * FROM " . $tablename . $where . $order;
    $dta = $pdo->query($query);

    $previous = array();
    $tablerow = array();
    $table    = new Table();
    while ($dbrow = $dta->fetch(PDO::FETCH_ASSOC)) {
      if (!samegroup($dbrow, $previous, $rowvars)) {
        if (sizeof($tablerow)) $table->add_row($tablerow);
        $tablerow = array();
        for ($j = 0; $j < sizeof($rowvars); $j++) {
          $tablerow[]   = $dbrow[$rowvars[$j]];
          $previous[$rowvars[$j]] = $dbrow[$rowvars[$j]];
        }
      }
      $tablerow[] = $dbrow['value'];
    }
    if (sizeof($tablerow)) $table->add_row($tablerow);

    return($table);
  }

?>
