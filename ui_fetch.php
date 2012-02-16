<pre>
<?php
  require_once("php/meta.php");

  $id = 3;
  $pdo = new PDO("sqlite:data/test.sqlite");
  $meta = get_meta($pdo, $id);

  // determine which variables are used in the selection
  // only use x and y and only first variable
  $selectedvars = array();
  $xvar = array();
  $yvar = array();
  if (isset($_POST['x'])) {
    $selectedvars[] = $_POST['x'][0];
    $xvar[] = $_POST['x'][0];
  }
  if (isset($_POST['y'])) {
    $selectedvars[] = $_POST['y'][0];
    $yvar[] = $_POST['y'][0];
  }
  //if (isset($_POST['columns'])) {
  //  foreach($_POST['columns'] as $var) $selectedvars[] = $var;
  //}
  //if (isset($_POST['rows'])) {
  //  foreach($_POST['rows'] as $var) $selectedvars[] = $var;
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
  $sql = "SELECT * FROM {$meta['name']}";
  if (sizeof($where)) {
    $sql .= " WHERE " . implode(" AND ", $where);
  }
  if (sizeof($selectedvars)) {
    $sql .= " ORDER BY " . implode(", ", $selectedvars);
  }
  print_r($sql);
  echo("\n");

  // run query
  $data = array();
  $result = $pdo->query($sql);
  while($row = $result->fetch(PDO::FETCH_ASSOC)) {
    if ($yvar) {
      $data[] = array($row[$yvar[0]] => $row['value']);
    }
  }
  print_r(json_encode($data));
  echo("\n");

  print_r($_POST);
?>
</pre>
