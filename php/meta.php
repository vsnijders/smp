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
          'defaultnot' => 5,
          'levels' => array('2007', '2008', '2009', '2010', 'Totaal 2007-2010')
        ),
      'grootteklasse' => array(
          'longname' => 'Grootteklasse',
          'default' => 5,
          'defaultnot' => 5,
          'levels' => array('Microbedrijf', 'Kleinbedrijf', 'Middenbedrijf', 'Grootbedrijf', 'Totaal')
        ),
      'sbi' => array(
          'longname' => 'SBI',
          'default' => 20,
          'defaultnot' => 20,
          'levels' => array('A Landbouw, bosbouw en visserij', 'B Delfstoffenwinning', 'C Industrie', 'D Energievoorziening', 'E Waterbedrijven en afvalbeheer', 
              'F Bouwnijverheid', 'G Handel', 'H Vervoer en opslag', 'I Horeca', 'J Informatie en communicatie', 'K Financiële dienstverlening', 
              'L Verhuur en handel van onroerend goed', 'M Specialistische zakelijke diensten', 'N Verhuur en overige zakelijke diensten', 
              'O Openbaar bestuur en overheidsdiensten', 'P Onderwijs', 'Q Gezondheids- en welzijnszorg', 'R Cultuur, sport en recreatie', 'S Overige dienstverlening', 'Totaal')
        ),
      'effect' => array(
          'longname' => 'Ontstaan/verdwijnen',
          'default' => 3,
          'defaultnot' => 3,
          'levels' => array('Ontstaan', 'Verdwijnen', 'Netto')
        ),
      'type' => array(
          'longname' => 'Oorzaak',
          'default' => 7,
          'defaultnot' => 7,
          'levels' => array('Afsplitsing', 'Fusie', 'Geboorte', 'Overname', 'Sterfte', 'Uiteenvallen', 'Totaal')
        ),
      'aantal'=> array(
          'longname' => 'Aantal bedrijven'
        ),
      'netto_verandering'=> array(
          'longname' => 'Netto verandering'
        ),
      'relatieve_verandering'=> array(
          'longname' => 'Relatieve verandering'
        ),
      'default_graph' => array(
          'type' => 'bar',
          'y' => 'sbi',
          'size' => 'relatieve_verandering'
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
      'quarter' => array(
          'longname' => 'Kwartaal',
          'default' => 34,
          'levels' => array("2003-1", "2003-2", "2003-3", "2003-4", "2004-1", "2004-2", "2004-3", "2004-4",
              "2005-1", "2005-2", "2005-3", "2005-4", "2006-1", "2006-2", "2006-3", "2006-4",
              "2007-1", "2007-2", "2007-3", "2007-4", "2008-1", "2008-2", "2008-3", "2008-4",
              "2009-1", "2009-2", "2009-3", "2009-4", "2010-1", "2010-2", "2010-3", "2010-4",
              "2011-1", "2011-2")
        ),
      'personal_characteristics' => array(
          'longname' => 'Persoonskenmerken',
          'default' => 15,
          'defaultnot' => 15,
          'levels' => array("Beroepsniveau: elementair", "Beroepsniveau: lager", "Beroepsniveau: middelbaar",
              "Beroepsniveau: hoger", "Beroepsniveau: wetenschappelijk", "Geslacht: man", "Geslacht: vrouw",
              "Leeftijd: 15-25 jaar", "Leeftijd: 25-45 jaar", "Leeftijd: 45-65 jaar", "Opleidingsniveau: lager onderwijs",
              "Opleidingsniveau: middelbaar onderwijs", "Opleidingsniveau: hoger onderwijs", "Opleidingsniveau: onbekend",
              "Totaal")
        ),
      'position_begin' => array(
          'longname' => 'Arbeidsmarktpositie begin periode',
          'default' => 4,
          'defaultnot' => 4,
          'levels' => array("Werkzaam", "Werkloos", "Niet-beroeps", "Totaal")
        ),
      'position_end' => array(
          'longname' => 'Arbeidsmarktpositie einde periode',
          'default' => 4,
          'defaultnot' => 4,
          'levels' => array("Werkzaam", "Werkloos", "Niet-beroeps", "Totaal")
        ),
      'number_of_persons' => array(
          'longname' => 'Aantal personen'
        ),
      'default_graph' => array(
          'type' => 'mosaic',
          'y' => 'position_end',
          'x' => 'position_begin',
          'size' => 'number_of_persons'
        )
    );
  // DIABETES
  $META['diabetes'] = array(
      'longname' => 'Huisartspatiënten met diabetes',
      'description' => 'Deze tabel toont voor diabetes het aantal personen dat ' .
        'gedurende het verslagjaar een of meer zorgepisodes heeft gehad, geregistreerd ' . 
        'door de huisarts waar de persoon staat ingeschreven. De aantallen worden ' .
        'uitgedrukt per 1000 personen en uitgesplitst naar leeftijd, geslacht en inkomen.',
      'url' => '',
      'variables' => array("jaar", "inkomensgroep", "geslacht", "leeftijd", "variable"),
      'idvariables' => array("jaar", "inkomensgroep", "geslacht", "leeftijd"),
      'jaar' => array(
          'longname' => 'Jaar',
          'default' => 8,
          'levels' => array('2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009')
        ),
      'inkomensgroep' => array(
          'longname' => 'Inkomensgroep',
          'default' => 11,
          'defaultnot' => 11,
          'levels' => array('1e 10%-inkomensgroep (laag inkomen)', '2e 10%-inkomensgroep',
            '3e 10%-inkomensgroep', '4e 10%-inkomensgroep', '5e 10%-inkomensgroep',
            '6e 10%-inkomensgroep', '7e 10%-inkomensgroep', '8e 10%-inkomensgroep',
            '9e 10%-inkomensgroep', '10e 10%-inkomensgroep (hoog inkomen)', 'Totaal')
        ),
      'geslacht' => array(
          'longname' => 'Geslacht',
          'default' => 3,
          'defaultnot' => 3,
          'levels' => array('Man', 'Vrouw', 'Totaal')
        ),
      'leeftijd' => array(
          'longname' => 'Leeftijd',
          'default' => 7,
          'defaultnot' => 7,
          'levels' => array('0 tot 15 jaar', '15 tot 30 jaar', '30 tot 45 jaar',
            '45 tot 60 jaar', '60 tot 75 jaar', '75 jaar of ouder', 'Totaal')
        ),
      'aantal_patienten'=> array(
          'longname' => 'Aantal patiënten met diabetes'
        ),
      'default_graph' => array(
          'type' => 'bar',
          'y' => 'jaar',
          'size' => 'aantal_patienten'
        )
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
