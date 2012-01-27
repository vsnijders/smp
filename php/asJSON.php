<?php
function asJSON($var){
   header('Content-type: application/json');
   echo json_encode($var);
   exit;
}
?>