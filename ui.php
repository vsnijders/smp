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
      'line' => array('x', 'y', 'colour', 'row', 'column'),
      'bubble' => array('x', 'y', 'size', 'colour','row', 'column'),
      'bar' => array('y', 'size', 'row', 'column'),
      'mosaic' => array('x', 'y', 'size','row', 'column')
    );
  //$chart_variables = array('x', 'y', 'size', 'colour', 'row', 'column');
  $chart_variables = array(
      'xcat' => array(
          'title' => 'x',
          'type' => 'categorical',
          'charts' => array('line', 'mosaic')
        ),
      'xnum' => array(
          'title' => 'x',
          'type' => 'numeric',
          'charts' => array('bubble')
        ),
      'ycat' => array(
          'title' => 'y',
          'type' => 'categorical',
          'charts' => array('bar', 'mosaic')
        ),
      'ynum' => array(
          'title' => 'y',
          'type' => 'numeric',
          'charts' => array('line', 'bubble')
        ),
      'size' => array(
          'title' => 'size',
          'type' => 'numeric',
          'charts' => array('bubble', 'bar', 'mosaic')
        ),
      'colour' => array(
          'title' => 'colour',
          'type' => 'categorical',
          'charts' => array('line', 'bubble')
        ),
      'row' => array(
          'title' => 'row',
          'type' => 'categorical',
          'charts' => array('line', 'bubble', 'bar', 'mosaic')
        ),
      'column' => array(
          'title' => 'column',
          'type' => 'categorical',
          'charts' => array('line', 'bubble', 'bar', 'mosaic')
        ),
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
    <script type="text/javascript" src="js/gog.js"></script>

    <style>

.measurevar {
  /*background : rgb(255, 211, 32);*/
  background : rgb(255, 241, 132);
}
.measurevar:hover {
  background : rgb(255, 211, 32);
  color : black;
}
.idvar {
  background : rgb(204, 237, 100);
}
.idvar:hover {
  background : rgb(144, 207, 0);
  color : black;
}
div.numeric ul {
  border-top : solid 1px rgb(255, 211, 32);
  border-bottom : solid 1px rgb(255, 211, 32);
}
div.categorical ul {
  border-top : solid 1px rgb(144, 207, 0);
  border-bottom : solid 1px rgb(144, 207, 0);
}

    </style>

    <script type="text/javascript">
      var graphtype = "bar";
      var selection = {
          id : <?php echo $id;?>,
          filter : {},
        };
        
      var mapping = Mapping();

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
          <?php if (isset($_REQUEST['echo'])): ?>
          $("#graphtype").html("<b>" + graphtype + "</b>");
          $("#graphdata").load("ui_fetch.php?html=1", selection);
          <?php endif; ?>
          jQuery.getJSON("ui_fetch.php", selection, function(data) {
            mapping.refresh(data);
            drawchart(data,selection, variables, mapping, graphtype);
            /*
            if (graphtype == "bar") {
              draw_bar(data, selection, variables, mapping);
            } else if (graphtype == "mosaic") {
              draw_mosaic(data, selection, variables);
            } else if (graphtype == "bubble") {
              draw_bubble(data, selection, variables);
            } else if (graphtype == "line") {
              draw_line(data, selection, variables);
            } else {
              d3.select(".chart").remove();
            } */
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
          if (selection[category].length == 0){ 
		     selection[category].push(variable);
			 mapping.map()[category]
			    .variable(variable, variables[variable]);
		  }
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
        }).width("90%");
      });

      $(function() {
        $("#<?php echo $meta['default_graph']['type'];?>").click();
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
  function print_variable($var, $meta) {
    if (in_array($var, $meta['idvariables'])) {
      echo "<li class=\"ui-state-default draggable collapseble idvar\" id=\"{$var}\">\n";
      echo "<span class=\"ui-icon ui-icon-gear collapse\"></span>\n";
      echo $meta[$var]['longname'] . "\n";
      echo "<div class=\"collapseblethingy\">\n";
      echo "<form>\n";
      $levelid = 1;
      foreach($meta[$var]['levels'] as $level){
	echo "<label><input type=\"checkbox\" class=\"filter\" name=\"{$var}\" value=\"{$levelid}\">{$level}</label><br>\n";
	$levelid += 1;
      }
      echo "</form>\n</div>\n</li>\n";
    } else {
      echo "<li class=\"ui-state-default draggable collapseble measurevar\" id=\"{$var}\">\n";
      echo $meta[$var]['longname'] . "\n</li>\n";
    }
  }

  /*$vars = array();
  foreach ($chart_variables as $var => $info) {
    $vars[$var] = $info['charts'];
  }*/

  $variables_used = array();
  //foreach($vars as $variable => $charttypes) {
  foreach($chart_variables as $variable => $info) {
    $class = implode(" ", $info['charts']);
    echo "<div class=\"plotvariable $class {$info['type']}\">\n";
    echo "<h3>{$info['title']}</h3>\n";
    echo "<ul id=\"{$info['title']}\" class=\"connectedSortable\">\n";
    //echo "<ul id=\"{$variable}\" class=\"connectedSortable\">\n";
    // id variables
    foreach ($meta['idvariables'] as $var) {
      if (isset($meta['default_graph']) && isset($meta['default_graph'][$variable]) && 
          $meta['default_graph'][$variable] == $var) {
        print_variable($var, $meta);
        $variables_used[] = $var;
      }
    }
    // numeric variables
    foreach ($meta['levels']['variable'] as $var) {
      if (isset($meta['default_graph']) && isset($meta['default_graph'][$variable]) && 
          $meta['default_graph'][$variable] == $var) {
        print_variable($var, $meta);
        $variables_used[] = $var;
      }
    }
    echo "</ul>\n";
    echo "</div>\n";
  }
?>

    <h3>Variables</h3>
    <ul id="variables" class="connectedSortable">
<?php
  // id variables
  foreach ($meta['idvariables'] as $var) {
    if (!in_array($var, $variables_used)) 
      print_variable($var, $meta);
  }
  // numeric variables
  foreach ($meta['levels']['variable'] as $var) {
    if (!in_array($var, $variables_used)) 
      print_variable($var, $meta);
  }

?>
    </ul>
  </div>

  <div class="content">
  <div id="resizable" class="ui-widget-content">
  <div class="graph">
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


