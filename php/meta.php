<?php
  $META = array();

  // BEVOLKINGSPROGNOSE
  $META['bevolkingsprognoses'] = array(
      'longname' => 'Bevolkingsprognose; bevolking per 1 januari, leeftijdsgroep, 2011-2060',
      'description' => 'Deze tabel bevat prognosecijfers over de bevolking van Nederland op 1 ' . 
          'januari naar geslacht en leeftijd. ',
      'url' => 'http://statline.cbs.nl/StatWeb/selection/?DM=SLNL&PA=80755NED&VW=T', 
      'variables' => array("gender", "age", "year", "variable"),
      'idvariables' => array("gender", "age", "year"),
      'gender' => array(
          'longname' => 'Geslacht',
          'default' => 3,
          'defaultnot' => 3,
          'levels' => array('Man', 'Vrouw', 'Totaal')
        ),
      'age' => array(
          'longname' => 'Leeftijd',
          'default' => 21,
          'defaultnot' => 21,
          'levels' => array(
              "0-5",   "5-10",  "10-15", "15-20", "20-25", "25-30", "30-35", "35-40",
              "40-45", "45-50", "50-55", "55-60", "60-65", "65-70", "70-75", "75-80", "80-85",
              "85-90", "90-95", "95+", "Totaal")
        ),
      'year' => array(
          'longname' => 'Jaar',
          'default' => 50,
          'defaultnot' => 50,
          'levels' => array(
              "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020",
              "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030",
              "2031", "2032", "2033", "2034", "2035", "2036", "2037", "2038", "2039", "2040",
              "2041", "2042", "2043", "2044", "2045", "2046", "2047", "2048", "2049", "2050",
              "2051", "2052", "2053", "2054", "2055", "2056", "2057", "2058", "2059", "2060")
        ),
      'prognosis' => array(
          'longname' => 'Verwacht aantal personen'
        ),
      'default_graph' => array(
          'type' => 'line',
          'xcat' => 'year',
          'ynum' => 'prognosis',
          'colour' => 'gender'
        )
    );
  // BEDRIJVENDYNAMIEK
  $META['bedrijvendynamiek'] = array(
      'longname' => 'Bedrijvendynamiek; ontstaan en verdwijnen van bedrijven',
      'description' => 'Deze tabel bevat gegevens of het ontstaan en verdwijnen van ' .
          'bedrijven. De cijfers zijn beschikbaar per SBI en grootteklasse. De volgende '. 
          'gebeurtenissen worden onderscheiden: splitsing, fusie, geboorte, overname ' .
          'sterfte en uiteenvallen.', 
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
          'ycat' => 'sbi',
          'size' => 'relatieve_verandering'
        )
    );
  // LABOURDYNAMICS
  $META['labourdynamics'] = array(
      'longname' => 'Arbeidsmarktdynamiek; wisselingen arbeidsmarktpositie',
      'description' => 'In deze tabel staan kwartaalcijfers over de arbeidsmarktmobiliteit ' . 
          'van 15 tot 65 jarige personen in Nederland. Vermeld wordt de ' . 
          'verandering in arbeidsmarktpositie tussen het eerste moment van ' . 
          'enqûeteren (begin periode) en de arbeidsmarktpositie drie maanden ' . 
          'later (einde periode). Op deze manier beschrijft deze tabel in hoeverre ' . 
          'personen na één kwartaal van arbeidsmarktpositie zijn gewisseld. ' . 
          'Er worden drie arbeidsmarktposities onderscheiden; werkzame ' . 
          'beroepsbevolking, werkloze beroepsbevolking en niet-beroepsbevolking.' ,
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
          'ycat' => 'position_end',
          'xcat' => 'position_begin',
          'size' => 'number_of_persons'
        )
    );
  // DIABETES
  $META['diabetes'] = array(
      'longname' => 'Personen met door de huisarts geregistreerde diagnose diabetes; inkomen',
      'description' => 'Deze tabel toont voor diabetes het aantal personen dat ' .
        'gedurende het verslagjaar een of meer zorgepisodes heeft gehad, geregistreerd ' . 
        'door de huisarts waar de persoon staat ingeschreven. De aantallen worden ' .
        'uitgedrukt per 1000 personen en uitgesplitst naar leeftijd, geslacht en inkomen.',
      'url' => 'http://statline.cbs.nl/StatWeb/selection/?DM=SLNL&PA=80824NED&VW=T',
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
          'ycat' => 'jaar',
          'size' => 'aantal_patienten'
        )
    );
  // DIABETES MEDICINE
  $META['diabetes_medicine'] = array(
      'longname' => 'Personen met verstrekte geneesmiddelen voor diabetes; herkomst en generatie',
      'description' => 'Deze tabel geeft het aantal en het percentage personen aan wie gedurende ' .
          'het verslagjaar geneesmiddelen zijn verstrekt die vergoed worden uit de ' .
          'verplichte basisverzekering voor geneeskundige zorg. ' .
          'Geneesmiddelen die aan opgenomen personen in ziekenhuizen (ziekenhuiszorg) ' .
          'en verpleeghuizen (AWBZ) worden verstrekt, zijn niet inbegrepen. Verstrekte ' .
          'geneesmiddelen aan personen in verzorgingshuizen zijn wel inbegrepen. ' . 
          'De cijfers worden uitgesplitst naar geneesmiddelengroep, herkomst, ' .
          'generatie, leeftijd en geslacht. ',
      'url' => 'http://statline.cbs.nl/StatWeb/publication/?DM=SLNL&PA=81072NED&D1=a&D2=a&D3=a&D4=a&D5=35&D6=a&HDR=T&STB=G4,G5,G3,G1,G2&FILE=~/Download/Geneesmiddelen,_herk_230312100131.csv&VW=T',
      'variables' => array("jaar", "herkomst", "geslacht", "leeftijd", "variable"),
      'idvariables' => array("jaar", "herkomst", "geslacht", "leeftijd"),
      'jaar' => array(
          'longname' => 'Jaar',
          'default' => 4,
          'levels' => array('2006', '2007', '2008', '2009')
        ),
      'herkomst' => array(
          'longname' => 'Herkomst en generatie',
          'default' => 1,
          'defaultnot' => 1,
          'levels' => array("Totaal", "Autochtoon", "Totaal allochtoon",
              "Westerse allochtoon", "Totaal niet-westerse allochtoon", "Marokko",
              "Turkije", "Suriname", "(voormalige) Nederlandse Antillen, Aruba",
              "Overig niet-westers", "Allochtoon, 1e generatie", "Allochtoon, 2e generatie")
        ),
      'geslacht' => array(
          'longname' => 'Geslacht',
          'default' => 3,
          'defaultnot' => 3,
          'levels' => array('Man', 'Vrouw', 'Totaal')
        ),
      'leeftijd' => array(
          'longname' => 'Leeftijd',
          'default' => 9,
          'defaultnot' => 9,
          'levels' => array("0 tot 15 jaar", "15 tot 25 jaar", "25 tot 35 jaar", "35 tot 45 jaar",
              "45 tot 55 jaar", "55 tot 65 jaar", "65 tot 75 jaar", "75 of ouder", "Totaal")
        ),
      'aantal'=> array(
          'longname' => 'Aantal personen met verstrekte geneesmiddel'
        ),
      'percentage'=> array(
          'longname' => 'Percentage personen met verstrekte geneesmiddel'
        ),
      'default_graph' => array(
          'type' => 'bar',
          'ycat' => 'herkomst',
          'size' => 'percentage'
        )
    );
  // DIABETES LINKED
  $META['diabetes_linked'] = array(
      'longname' => 'Diabetes; gekoppelde tabel',
      'description' => 'Deze tabel bevat gegevens over diabetes uit drie verschillende
          tabellen. Ten eerste gegevens uit POLS (Permanent Onderzoek Leefsituatie) met
          daarin informatie over: percentage personen met diabetes (type I en II), en
          percentages personen met overgewicht voor de jaren 2001-2009 uitgesplitst naar
          geslacht en leeftijd. Ten tweede, gegevens over patiëntcontacten met de 
          huisarts: aantal patiënten dat contact heeft gehad met de huisarts gedurende
          het jaar voor de jaren 2002-2009 uitgesplitst naar leeftijd en geslacht. Ten
          derde, gegevens over medicijngebruik: aantal patiënten dat diabetes medicijnen
          gebruikt voor de jaren 2006-2009 uitgesplitst naar leeftijd en geslacht.', 
      'url' => array(
          'http://statline.cbs.nl/StatWeb/publication/default.aspx?DM=SLNL&PA=80193NED&D1=137&D2=a&D3=0-17&D4=0&D5=a&HDR=G3&STB=T%2cG4%2cG1%2cG2&VW=D',
          'http://statline.cbs.nl/StatWeb/publication/default.aspx?DM=SLNL&PA=03799&D1=139-141%2c267-268%2c270-271&D2=27-44&D3=0&D4=1-9&HDR=G2%2cT&STB=G1%2cG3&VW=D',
          'http://statline.cbs.nl/StatWeb/publication/?DM=SLNL&PA=81072NED&D1=a&D2=a&D3=a&D4=a&D5=35&D6=a&HDR=T&STB=G4,G5,G3,G1,G2&FILE=~/Download/Geneesmiddelen,_herk_230312100131.csv&VW=T'
        ),
      'variables' => array("jaar", "geslacht", "leeftijd", "variable"),
      'idvariables' => array("jaar", "geslacht", "leeftijd"),
      'jaar' => array(
          'longname' => 'Jaar',
          'default' => 9,
          'levels' => array('2001', '2002', '2003', '2004', '2005', '2006',
              '2007', '2008', '2009')
        ),
      'geslacht' => array(
          'longname' => 'Geslacht',
          'default' => 3,
          'defaultnot' => 3,
          'levels' => array('Man', 'Vrouw', 'Totaal')
        ),
      'leeftijd' => array(
          'longname' => 'Leeftijd',
          'default' => 8,
          'defaultnot' => 8,
          'levels' => array(
            "0 tot 25 jaar", "25 tot 35 jaar", "35 tot 45 jaar", "45 tot 55 jaar", 
            "55 tot 65 jaar", "65 tot 75 jaar", "75 jaar of ouder", "Totaal")
        ),
      'aantalgeneesmiddel' => array(
          'longname' => 'Aantal personen dat geneesmiddel voor diabetes gebruikt (2006-2009)'
        ),
      'percentageneesmiddel' => array(
          'longname' => 'Percentage personen dat geneesmiddel voor diabetes gebruikt (2006-2009)'
        ),
      'suiker' => array(
          'longname' => 'Percentage personen met suikerziekte (2001-2009)'
        ),
      'suiker1' => array(
          'longname' => 'Percentage personen met suikerziekte type 1 (2001-2009)'
        ),
      'suiker2' => array(
          'longname' => 'Percentage personen met suikerziekte type 2 (2001-2009)'
        ),
      'ondergewicht' => array(
          'longname' => 'Percentage personen met ondergewicht (2001-2009)'
        ),
      'normaalgewicht' => array(
          'longname' => 'Percentage personen met normaal gewicht (2001-2009)'
        ),
      'matigovergewicht' => array(
          'longname' => 'Percentage personen met matig overgewicht (2001-2009)'
        ),
      'ernstigovergewicht' => array(
          'longname' => 'Percentage personen met ernstig overgewicht (2001-2009)'
        ),
      'aantalpatienten' => array(
          'longname' => 'Percentage personen dat contact heeft gehad met huisarts (2002-2009)'
        ),
      'default_graph' => array(
          'type' => 'bar',
          'ycat' => 'jaar',
          'size' => 'suiker',
          'column' => 'geslacht'
        )
    );
  // PARTICIPATION 
  $META['participation'] = array(
      'longname' => 'Netto arbeidsmarktparticipatie 1971-2010 naar geslacht, generatie en leeftijd',
      'description' => 'Deze tabel bevat de arbeidsparticipatie van mannen en vrouwen uitgesplitst ' .
          'naar generatie en leeftijd.', 
      'url' => '',
      'variables' => array("geslacht", "generatie", "leeftijd", "variable"),
      'idvariables' => array("geslacht", "generatie", "leeftijd"),
      'geslacht' => array(
          'longname' => 'Geslacht',
          'default' => 2,
          'levels' => array('Man', 'Vrouw')
        ),
      'generatie' => array(
          'longname' => 'Geboortegeneratie',
          'default' => 4,
          'levels' => array(
              "1906-1910", "1911-1915", "1916-1920", "1921-1925", "1926-1930", "1931-1935", "1936-1940",
              "1941-1945", "1946-1950", "1951-1955", "1956-1960", "1961-1965", "1966-1970", "1971-1975",
              "1976-1980", "1981-1985", "1986-1990")
        ),
      'leeftijd' => array(
          'longname' => 'Leeftijd',
          'default' => 1,
          'levels' => array(
              '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', 
              '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
              '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
              '61', '62', '63', '64', '65', '66', '67')
        ),
      'participatie'=> array(
          'longname' => 'Arbeidsmarktparticipatie'
        ),
      'default_graph' => array(
          'type' => 'line',
          'ynum' => 'participatie',
          'xcat' => 'leeftijd',
          'colour' => 'generatie',
          'row' => 'geslacht'
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
