<!DOCTYPE html>
<?php
  require_once("php/meta.php");

  // table id to read in: TODO allow to set using GET/POST
  $id = 3;
  if (isset($_REQUEST['id']) && is_numeric($_REQUEST['id']))
    $id = $_REQUEST['id'];

  // read metadata of table
  $pdo = new PDO("sqlite:data/test.sqlite");
  $meta = get_meta($pdo, $id);

  $charts = array(
      'bar' => array('y', 'size', 'row', 'column'),
      'mosaic' => array('x', 'y', 'size'),
      'line' => array('x', 'y', 'colour'),
      'bubble' => array('x', 'y', 'points', 'size', 'colour')
    );
?>
<html>
  <head>
    <meta charset="utf-8" />

    <title>StatMine - <?php echo $meta['longname'];?></title>
    
    <!-- webpage icon -->
    <link type="text/css" href="css/ui.css" rel="stylesheet" />
    <link rel="shortcut icon" href="img/favicon.ico" type="image/vnd.microsoft.icon" />
    <link rel="icon" href="img/favicon2.png" type="image/png" />

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
    <script type="text/javascript" src="js/barchart.js"></script>
    <script type="text/javascript" src="js/mosaic.js"></script>
    <script type="text/javascript" src="js/bubble.js"></script>
    <script type="text/javascript" src="js/linechart.js"></script>
    <script type="text/javascript" src="js/cross.js"></script>

    <script type="text/javascript">
      var graphtype = "bar";
      var selection = {
          id : <?php echo $id;?>,
          filter : {},
          x : "jaar",
          y : "aantal",
          colour: "type"
        };

<?php
  echo "      var variables = {";
  $first = true;
  foreach ($meta['idvariables'] as $variable) {
    if ($first) $first = false;
    else echo ",";
    echo $variable . ' : "categorical"';
  }
  foreach ($meta['measurevariables'] as $variable) {
    if ($first) $first = false;
    else echo ",";
    echo $variable . ' : "numerical"';
  }
  echo "      };\n";
?>

      function redraw_graph() {
        var validated = false;
        if (graphtype == "bar") {
          validated = validate_bar(selection, variables);
        } else if (graphtype == "mosaic") {
          validated = validate_mosaic(selection, variables);
        } else if (graphtype == "bubble") {
          validated = validate_bubble(selection, variables);
        } else if (graphtype == "line") {
          validated = validate_line(selection, variables);
        } 
        if (validated === true) {
          $("#graphtype").html("<b>" + graphtype + "</b>");
          $("#graphdata").load("ui_fetch.php?html=1", selection);
          jQuery.getJSON("ui_fetch.php", selection, function(data) {
            if (graphtype == "bar") {
              draw_bar(data, selection, variables);
            } else if (graphtype == "mosaic") {
              draw_mosaic(data, selection, variables);
            } else if (graphtype == "bubble") {
              draw_bubble(data, selection, variables);
            } else if (graphtype == "line") {
              draw_line(data, selection, variables);
            } else {
              d3.select(".chart").remove();
            }
          })
        } else {
          $(".graph").html("<p>" + validated + "</p>");
        }
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
          // only use the first variable in a category
          if (selection[category].length == 0) 
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

      $(function() {
        $('#resizable').resizable({
          minHeight: 300,
          minWidth: 300,
          stop: function(event, ui) { 
            redraw_graph(); 
          }
        });
      });

      $(function() {
        $("#bar").click();
      });

    </script>

  </head>
  <body>
   
  <header>
    <h1><a href="index.php">StatMine</a> - <?php echo $meta['longname'];?></h1>
  </header>

  <article>

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
    echo "<span class=\"ui-icon ui-icon-triangle-1-e collapse\"></span>\n";
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

  <div class="content">
  <div id="resizable" class="ui-widget-content">
  <div class="graph">
  </div>
  <div class="graph2">
  </div>
  </div>

  <div id="graphtype">
  </div>
  <div id="graphdata">
  </div>


  </article>

  <footer>
  </footer>

  </body>
</html>


