<?php
  require_once("php/meta.php");
  require_once("php/asJSON.php");

  $id = 3;
  $pdo = new PDO("sqlite:data/test.sqlite");
  $meta = get_meta($pdo, $id);

  echo "<pre>";
  print_r($_REQUEST);

  // determine which variables are used in the selection
  // only use x and y and only first variable
  $selectedvars = array();
  $measurevars = array();
  $xvar = array();
  $yvar = array();
  if (isset($_REQUEST['x'])) {
    foreach ($_REQUEST['x'] as $var) {
      if (in_array($var, $meta['levels']['variable'])) {
        $measurevars[] = $var;
      } else {
        if (sizeof($xvar) < 1) {
          $selectedvars[] = $var;
          $xvar[] = $var;
        }
      }
    }
  }
  if (isset($_REQUEST['y'])) {
    foreach ($_REQUEST['y'] as $var) {
      if (in_array($var, $meta['levels']['variable'])) {
        $measurevars[] = $var;
      } else {
        if (sizeof($xvar) < 1) {
          $selectedvars[] = $var;
          $yvar[] = $var;
        }
      }
    }
  }
  //if (isset($_REQUEST['columns'])) {
  //  foreach($_REQUEST['columns'] as $var) $selectedvars[] = $var;
  //}
  //if (isset($_REQUEST['rows'])) {
  //  foreach($_REQUEST['rows'] as $var) $selectedvars[] = $var;
  //}

  // build query
  $notselected = array_diff($meta['idvariables'], $selectedvars);
  $where = array();
  foreach($notselected as $var) {
    if (isset($_REQUEST['filter']) && isset($_REQUEST['filter'][$var])) {
      $sub_where = array();
      foreach($_REQUEST['filter'][$var] as $val) {
        $sub_where[] = $var . "= '" . $val . "'";
      }
      if (sizeof($sub_where))
        $where[] = '(' . implode(' OR ', $sub_where) . ')';
    } else {
      $where[] = $var . "= 'TOTAL'";
    }
  }
  foreach($selectedvars as $var) {
    if (isset($_REQUEST['filter']) && isset($_REQUEST['filter'][$var])) {
      $sub_where = array();
      foreach($_REQUEST['filter'][$var] as $val) {
        $sub_where[] = $var . "= '" . $val . "'";
      }
      if (sizeof($sub_where))
        $where[] = '(' . implode(' OR ', $sub_where) . ')';
    } else {
      $where[] = $var . "!= 'TOTAL'";
    }
  }
  if (sizeof($measurevars)) {
    $sub_where = array();
    foreach($measurevars as $var) {
      $sub_where[] = "variable = '" . $var . "'";
    }
    $where[] = '(' . implode(' OR ', $sub_where) . ')';
    $selectedvars[] = 'variable';
  }

  $vars = $selectedvars;
  $vars[] = 'value';
  $sql = "SELECT " . implode(", ", $vars) . " FROM {$meta['name']}";
  if (sizeof($where)) {
    $sql .= " WHERE " . implode(" AND ", $where);
  }
  if (sizeof($selectedvars)) {
    $sql .= " ORDER BY " . implode(", ", $selectedvars);
  }
  echo($sql);
  echo("\n");

  // run query
  $result = $pdo->query($sql);
  //$data = $result->fetchAll(PDO::FETCH_ASSOC);
  //print_r($data);

  /*$data = array();
  while($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
    if ($yvar) {
      $data[] = array('var' => $row[$yvar[0]], 'val'=> $row['value']);
    }
  }*/

  $data = array();
  $continue = true;
  while ($continue) {
    $data_row = array();
    for ($i = 0; $i < sizeof($measurevars); $i++) {
      $row = $result->fetch(PDO::FETCH_ASSOC);
      if (!$row) {
        $continue = false;
        break;
      } 
      foreach ($selectedvars as $var) {
        if ($var != 'variable') {
          $data_row[$var] = $row[$var];
        } else {
          if ($row['variable'] == $measurevars[$i]) $data_row[$measurevars[$i]] = $row['value'];
        }
      }
    }
    if ($continue) $data[] = $data_row;
  }
  print_r($data);

  //print_r(json_encode($data));
  //asJSON($data);

  echo "</pre>";
?>
