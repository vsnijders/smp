<?php
  require_once("php/meta.php");
  require_once("php/asJSON.php");

  $id = 3;
  $pdo = new PDO("sqlite:data/test.sqlite");
  $meta = get_meta($pdo, $id);

  // Determine which variables are used in the selection
  // only use x and y and only first variable
  $selectionvars = array('x', 'y', 'size', 'colour', 'points');
  $idvars        = array();
  $measurevars   = array();
  foreach($selectionvars as $selectionvar) {
    if (isset($_REQUEST[$selectionvar])) {
      foreach ($_REQUEST[$selectionvar] as $var) {
        if (in_array($var, $meta['levels']['variable'])) {
          $measurevars[] = $var;
        } else {
          $idvars[] = $var;
        }
      }
    }
  }

  // Build query
  $notselected = array_diff($meta['idvariables'], $idvars);
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
  foreach($idvars as $var) {
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
    $idvars[] = 'variable';
  }

  $vars = $idvars;
  $vars[] = 'value';
  $sql = "SELECT " . implode(", ", $vars) . " FROM {$meta['name']}";
  if (sizeof($where)) {
    $sql .= " WHERE " . implode(" AND ", $where);
  }
  if (sizeof($idvars)) {
    $sql .= " ORDER BY " . implode(", ", $idvars);
  }

  // Run query
  $result = $pdo->query($sql);

  // Transform the results of the database query to something that can be sent back. We want 
  // something with the following form:
  //   idvar1 idvar2 ... idvarN measurevar1 ... measurevarM
  // The following code works, but isn't very pretty. Can probably be improved upon.
  $data = array();
  while (true) {
    $data_row = array();
    for ($i = 0; $i < sizeof($measurevars); $i++) {
      $row = $result->fetch(PDO::FETCH_ASSOC);
      if (!$row) break;
      foreach ($idvars as $var) {
        if ($var != 'variable') {
          $data_row[$var] = $row[$var];
        } else {
          if ($row['variable'] == $measurevars[$i]) 
            $data_row[$measurevars[$i]] = $row['value'];
        }
      }
    }
    if (sizeof($data_row)) {
      $data[] = $data_row;
    } else break;
  }


  // Return data
  if (isset($_REQUEST['html'])) {
    echo "<pre>";
    print_r($_REQUEST);
    echo("\n");
    echo($sql);
    echo("\n");
    print_r($data);
    echo "</pre>";
  } else {
    asJSON($data);
  }
?>
