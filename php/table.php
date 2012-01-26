<?php

class Table {

  // Public members
  public function add_row($row) {
    if (!is_array($row)) 
      throw new Exception('$row is not an array.');
    //TODO check length
    $this->table[] = $row;
  }

  public function get_row($i) {
    if ($i < 0 | $i >= sizeof($this->table))
      throw new Exception('Invalid row number.');
    return $this->table[$i];
  }

  public function nrows() {
    return sizeof($this->table);
  }

  public function add_header($header) {
    if (!is_array($header)) 
      throw new Exception('$header is not an array.');
    //TODO check length
    $this->header = $header;
  }

  public function get_header() {
    return $this->header;
  }
  


  // Private members
  private $table = array();
  private $header = array();
}


function print_table(Table $table) {
  echo "<table>\n";
  echo "<thead>\n";
  $header = $table->get_header();
  foreach($header as $cell) {
    echo "<th>" . $cell . "</th>";
  }
  echo "</thead>\n";
  echo "<tbody>\n";
  for ($i = 0; $i < $table->nrows(); $i++) {
    $row = $table->get_row($i);
    echo "<tr>";
    foreach ($row as $cell) {
      echo "<td>" . $cell . "</td>";
    }
    echo "</tr>\n";
  }
  echo "</tbody>\n</table>\n";
}

?>

