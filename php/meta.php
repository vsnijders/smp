<?php
  $META = array();

  $META['exampletable'] = array(
      'variables' => array("gender", "age", "variable"),
      'idvariables' => array("gender", "age")
    );
  $META['bevolkingsprognoses'] = array(
      'variables' => array("gender", "age", "year", "variable"),
      'idvariables' => array("gender", "age", "year")
    );
  $META['bedrijvendynamiek'] = array(
      'variables' => array("jaar", "grootteklasse", "sbi", "effect", "variable"),
      'idvariables' => array("jaar", "grootteklasse", "sbi", "effect"),
    );

  
  function get_meta($pdo, $tableid) {
    // get tablename
    $r = $pdo->query("SELECT * FROM tables WHERE id=$tableid");
    $meta = $r->fetch();
    $tablename = $meta['name'];
    // read meta
    global $META;
    $meta['variables']   = $META[$tablename]['variables'];
    $meta['idvariables'] = $META[$tablename]['idvariables'];
    $meta['levels']      = array();
    // read variable levels
    for ($i = 0; $i < sizeof($meta['variables']); $i++) {
      $variable = $meta['variables'][$i];
      $query    = "SELECT {$variable} FROM {$tablename} GROUP BY {$variable}";
      $dta      = $pdo->query($query);
      $levels   = array();
      while ($row = $dta->fetch()) {
        $levels[] = $row[0];
      }
      $meta['levels'][$variable] = $levels;
    }
    return($meta);
  }

?>
