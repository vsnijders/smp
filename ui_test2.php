<!DOCTYPE html>
<?php
  require_once("php/meta.php");

  // table id to read in: TODO allow to set using GET/POST
  $id = 3;

  // read metadata of table
  $pdo = new PDO("sqlite:data/test.sqlite");
  $meta = get_meta($pdo, $id);

  $charts = array(
      'bar' => array('y', 'size'),
      'mosaic' => array('x', 'y', 'size'),
      'line' => array('x', 'y', 'points', 'colour'),
      'bubble' => array('x', 'y', 'points', 'size', 'colour')
    );
?>
<html>
  <head>
    <meta charset="utf-8" />

    <title>jQuery test</title>

    <!-- jQuery includes -->
    <link type="text/css" href="css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" />
    <script type="text/javascript" src="js/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.8.17.custom.min.js"></script>

    <!-- tipsy -->
    <script type="text/javascript" src="js/jquery.tipsy.js"></script>
    <link href="css/tipsy.css" rel="stylesheet" type="text/css" />

    <!-- D3 includes -->
    <script type="text/javascript" src="js/d3/d3.js"></script>

    <!-- Plotting includes -->
    <script type="text/javascript" src="js/barplot.js"></script>
    <script type="text/javascript" src="js/barchart.js"></script>
    <script type="text/javascript" src="js/mosaic.js"></script>
    <script type="text/javascript" src="js/bubble.js"></script>

    <script type="text/javascript">
      var graphtype = "bar";
      var selection = {
          x : [],
          y : [],
          rows : [],
          columns : [],
          filter : {}
        };

      function redraw_graph() {
        $("#graphtype").html("<b>" + graphtype + "</b>");
        $("#graphdata").load("ui_fetch_var.php?html=1", selection);
        jQuery.getJSON("ui_fetch_var.php", selection, function(data) {
          if (graphtype == "bar") {
            bar_chart(data, selection);
          } else if (graphtype == "mosaic") {
            draw_mosaic(data, selection);
          } else if (graphtype == "bubble") {
            draw_bubble(data, selection);
          } else {
            d3.select(".chart").remove();
          }
        })
      }

      $(function() {
        $(".connectedSortable").sortable({
          connectWith: ".connectedSortable",
          update : function(event, ui) { 
            if (this.id != "variables") {
              refresh_selection();
              redraw_graph();
            }
          }
        }).disableSelection();
      });

      refresh_selection = function() {
        // update the selection itself
        $('.plotvariable ul').each(function() {
          var category = this.id;
          selection[category] = [];
        });
        $('.plotvariable li').each(function() {
          var variable = this.id;
          var category = this.parentNode.id;
          selection[category].push(variable);
        });
        // update the filter
        selection.filter = {}
        $(".filter:checked").each(function() {
          var value = this.value;
          var variable = this.name;
          if (selection.filter[variable] === undefined) 
            selection.filter[variable] = [];
          selection.filter[variable].push(value);
          return (true);
        }) ;
      }

      $(function() {
        $("#graph").buttonset();
        $("#graph input").click(function() {
          graphtype = this.id;
          var sel = $('.plotvariable').not('.' + graphtype);
          $('li', sel).appendTo('#variables');
          sel.hide();
          $('.' + graphtype).show();
          refresh_selection();
          redraw_graph();
        })
      });


      $(function(){
        $('.collapse').click(function() {
          $(this).next().toggle('slow');
          return false;
        }).next().hide();
      });

      $(function(){
        $('.filter').change(function() {
          refresh_selection();
          redraw_graph();
        });
      });

    </script>

    <style type="text/css">
      * { font-family : sans-serif; font-size: 10px;}
      div.menu {
        width : 240px;
        float : left;
      }
      div.menu h3 {
        font-size : 100%;
        font-weight : bold;
        font-variant : small-caps;
        margin-bottom : 0pt;
      }
      div.graph {
        margin-left : 240px;
        color : black;
      }
      div#graphtype, div#graphdata {
        color : gray;
      }
      .connectedSortable { 
        border-top : solid 1px rgb(200,200,200);
        border-bottom : solid 1px rgb(200,200,200);
        list-style-type: none; 
        margin: 0; 
        padding: 4px 0; 
        width: 100%; 
      }
      .connectedSortable li { 
        margin: 2px 0px 2px 0px; 
        padding: 0.2em; 
        padding-left: .8em; 
        font-size: 10px; 
        height: 13px; 
      }
      .connectedSortable li span { 
        position: absolute; 
        margin-left: -1.3em;        
      }
      .chart text {
        font-size : 10px;
        font-family : sans-serif;
      }
      .draggable {
        cursor: move;
      }
      .collapseblethingy {
        background : rgba(0,0,0, 0.5);
        color : white;
        z-index : 10;
        position : relative;
        left : 235px;
        margin-top : -10px;
        cursor : auto; 
      }
      .collapse {
        position : relative;
        left : 240px;
        margin-top : -3px;
        cursor : pointer;
      }
    </style>

  </head>
  <body>

  <div class="menu">
    <h3>Graph</h3>
    <form>
      <div id="graph">
<?php
  foreach($charts as $chart => $variables) {
    echo "<input type=\"radio\" id=\"$chart\" name=\"radio\" checked=\"checked\"/>\n";
    echo "<label for=\"$chart\">$chart</label>\n";
  }
?>
      </div>
    </form>

<?php
  $vars = array();
  foreach($charts as $chart => $variables) {
    foreach ($variables as $variable) {
      if (!isset($vars[$variable])) $vars[$variable] = array();
      $vars[$variable][] = $chart;
    }
  }
  foreach($vars as $variable => $charttypes) {
    $class = implode(" ", $charttypes);
    echo "<div class=\"plotvariable $class\">\n";
    echo "<h3>$variable</h3>\n";
    echo "<ul id=\"$variable\" class=\"connectedSortable\">\n";
    echo "</ul>\n";
    echo "</div>\n";
  }
?>

    <h3>Variables</h3>
    <ul id="variables" class="connectedSortable">
<?php
  // id variables
  foreach ($meta['idvariables'] as $var) {
    echo "<li class=\"ui-state-default draggable collapseble\" id=\"{$var}\">\n";
    echo "<span class=\"ui-icon ui-icon-gear collapse\"></span>\n";
    echo $var . "\n";
    echo "<div class=\"collapseblethingy\">\n";
    echo "<form>\n";
    foreach ($meta['levels'][$var] as $level) {
      echo "<label><input type=\"checkbox\" class=\"filter\" name=\"{$var}\" value=\"{$level}\">{$level}</label><br>\n";
    }
    echo "</form>\n</div>\n</li>\n";
  }
  // numeric variables
  foreach ($meta['levels']['variable'] as $var) {
    echo "<li class=\"ui-state-default draggable collapseble\" id=\"{$var}\">\n";
    echo "$var" . "\n</li>\n";
  }

?>
    </ul>
  </div>

  <div class="graph">
  </div>

  <div id="graphtype">
  </div>
  <div id="graphdata">
  </div>

  </body>
</html>


