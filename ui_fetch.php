<?php
  require_once("php/meta.php");
  require_once("php/asJSON.php");

  $id = 3;
  $pdo = new PDO("sqlite:data/test.sqlite");
  $meta = get_meta($pdo, $id);

  // determine which variables are used in the selection
  // only use x and y and only first variable
  $selectedvars = array();
  $xvar = array();
  $yvar = array();
  if (isset($_REQUEST['x'])) {
    $selectedvars[] = $_REQUEST['x'][0];
    $xvar[] = $_REQUEST['x'][0];
  }
  if (isset($_REQUEST['y'])) {
    $selectedvars[] = $_REQUEST['y'][0];
    $yvar[] = $_REQUEST['y'][0];
  }
  //if (isset($_REQUEST['columns'])) {
  //  foreach($_REQUEST['columns'] as $var) $selectedvars[] = $var;
  //}
  //if (isset($_REQUEST['rows'])) {
  //  foreach($_REQUEST['rows'] as $var) $selectedvars[] = $var;
  //}

  // build query
  $notselected = array_diff($meta['variables'], $selectedvars);
  $where = array();
  foreach($notselected as $var) {
    $where[] = $var . "= 'TOTAL'";
  }
  foreach($selectedvars as $var) {
    $where[] = $var . "!= 'TOTAL'";
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
  //echo($sql);

  // run query
  $data = array();
  $result = $pdo->query($sql);
  $data = $result->fetchAll(PDO::FETCH_ASSOC);
  /*while($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $data[] = $row;
    if ($yvar) {
      $data[] = array('var' => $row[$yvar[0]], 'val'=> $row['value']);
    }
  }*/
  //print_r(json_encode($data));
  asJSON($data);

?>
