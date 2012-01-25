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
    // generate sql query
    $order = implode(', ', $rowvars);
    if (sizeof($colvars)) $order = $order . ', ' . implode(', ', $colvars);
    if (sizeof($order)) $order = ' ORDER BY ' . $order;
    $query = "SELECT * FROM " . $tablename . $where . $order;
    // query database
    $dta = $pdo->query($query);
    // build table: all values for which the rowvars are the same are added to 
    // the same row
    $previous = array();
    $tablerow = array();
    $header   = $rowvars;
    $table    = new Table();
    while ($dbrow = $dta->fetch(PDO::FETCH_ASSOC)) {
      // check if rowvars are equal to previous row
      if (!samegroup($dbrow, $previous, $rowvars)) {
        // add previous row to the table
        if (sizeof($tablerow)) $table->add_row($tablerow);
        // start a new row
        $tablerow = array();
        for ($j = 0; $j < sizeof($rowvars); $j++) {
          $tablerow[]   = $dbrow[$rowvars[$j]];
          $previous[$rowvars[$j]] = $dbrow[$rowvars[$j]];
        }
        $header   = $rowvars;
      }
      $head = array();
      for ($j = 0; $j < sizeof($colvars); $j++) {
        $head[] = $dbrow[$colvars[$j]];
      }
      $header[] = implode(' - ', $head);
      // append value to the end of the current row
      $tablerow[] = $dbrow['value'];
    }
    $table->add_header($header);
    // add final row to the table
    if (sizeof($tablerow)) $table->add_row($tablerow);
    return($table);
  }

?>
