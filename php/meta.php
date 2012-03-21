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
  // BEDRIJVENDYNAMIEK
  $META['bedrijvendynamiek'] = array(
      'longname' => 'Enterprise dynamics; creation and ending of enterprises',
      'description' => 'This table contains figures on the creation and ending of ' .
        'enterprises. The figures are specified for SBI and size class. The following ' .
        'types of events are recognised: split-off, fusion, birth, take-over, death, '.
        'and breaking-apart.',
      'url' => '',
      'variables' => array("jaar", "grootteklasse", "sbi", "effect", "type", "variable"),
      'idvariables' => array("jaar", "grootteklasse", "sbi", "effect", "type"),
      'jaar' => array(
          'longname' => 'Jaar',
          'default' => 5,
          'levels' => array('2007', '2008', '2009', '2010', 'Totaal 2007-2010')
        ),
      'grootteklasse' => array(
          'longname' => 'Grootteklasse',
          'default' => 5,
          'levels' => array('Microbedrijf', 'Kleinbedrijf', 'Middenbedrijf', 'Grootbedrijf', 'Totaal')
        ),
      'sbi' => array(
          'longname' => 'SBI',
          'default' => 20,
          'levels' => array('A Landbouw, bosbouw en visserij', 'B Delfstoffenwinning', 'C Industrie', 'D Energievoorziening', 'E Waterbedrijven en afvalbeheer', 
              'F Bouwnijverheid', 'G Handel', 'H Vervoer en opslag', 'I Horeca', 'J Informatie en communicatie', 'K Financi&euml;le dienstverlening', 
              'L Verhuur en handel van onroerend goed', 'M Specialistische zakelijke diensten', 'N Verhuur en overige zakelijke diensten', 
              'O Openbaar bestuur en overheidsdiensten', 'P Onderwijs', 'Q Gezondheids- en welzijnszorg', 'R Cultuur, sport en recreatie', 'S Overige dienstverlening', 'Totaal')
        ),
      'effect' => array(
          'longname' => 'Ontstaan of verdwijnen van bedrijven',
          'default' => 3,
          'levels' => array('Ontstaan', 'Verdwijnen', 'Netto')
        ),
      'type' => array(
          'longname' => 'Vorm van ontstaan of verdwijnen',
          'default' => 7,
          'levels' => array('Afsplitsing', 'Fusie', 'Geboorte', 'Overname', 'Sterfte', 'Uiteenvallen', 'Totaal')
        )
    );
  // LABOURDYNAMICS
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
    $meta_db = $r->fetch();
    $tablename = $meta_db['name'];
    // read meta
    global $META;
    $meta = $META[$tablename];
    $meta['id']     = $meta_db['id'];
    $meta['name']   = $meta_db['name'];
    $meta['levels'] = array();
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
