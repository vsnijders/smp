<?php
  $META = array();

  $META['exampletable'] = array(
      'longname' => 'Some test table containing artificial data',
      'description' => '',
      'variables' => array("gender", "age", "variable"),
      'idvariables' => array("gender", "age")
    );
  $META['bevolkingsprognoses'] = array(
      'longname' => 'Population prognoses; population on january the first 2011-2060',
      'description' => 'This table contains prognoses for the dutch population for the years ' .
        '2011-2060. Specified for age and gender.',
      'variables' => array("gender", "age", "year", "variable"),
      'idvariables' => array("gender", "age", "year")
    );
  $META['bedrijvendynamiek'] = array(
      'longname' => "Enterprise dynamics; creation and ending of enterprises",
      'description' => 'This table contains figures on the creation and ending of ' .
        'enterprises. The figures are specified for SBI and sizeclass. The following ' .
        'types of events are recognised: split-off, fusion, birth, take-over, death, '.
        'and breaking-apart.',
      'url' => '',
      'variables' => array("jaar", "grootteklasse", "sbi", "effect", "type", "variable"),
      'idvariables' => array("jaar", "grootteklasse", "sbi", "effect", "type"),
    );
  $META['labourdynamics'] = array(
      'longname' => 'Labourmarket dynamics; changes in labourmarketposition',
      'description' => 'This table contains quarterly figures on the labourmarket mobility of persons ' . 
        'ages between 15 and 65 years in The Netherlands. It contains information on the labourmarket ' .
        'position at the beginning of the survey and that three months later. ',
      'url' => 'http://statline.cbs.nl/StatWeb/publication/?DM=SLNL&PA=80220NED&D1=a&D2=a&D3=0-9,13-17&D4=a&STB=G3,G2,T,G1&VW=T',
      'variables' => array("quarter", "personal_characteristics", "position_begin", "position_end", "variable"),
      'idvariables' => array("quarter", "personal_characteristics", "position_begin", "position_end"),
    );

  
  function get_meta($pdo, $tableid) {
    // get tablename
    $r = $pdo->query("SELECT * FROM tables WHERE id=$tableid");
    $meta = $r->fetch();
    $tablename = $meta['name'];
    // read meta
    global $META;
    $meta['longname']    = $META[$tablename]['longname'];
    $meta['description'] = $META[$tablename]['description'];
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
    $meta['measurevariables'] = $meta['levels']['variable'];
    return($meta);
  }

?>
