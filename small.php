<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>StatMine: Bedrijvendynamiek</title>

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

    <script type="text/javascript" src="js/gog.js"></script>
    <script type="text/javascript" src="js/sm.js"></script>
    <script type="text/javascript" src="js/cross.js"></script>
    <script type="text/javascript">
      var graphtype = "bar";
      var selection = {
          x : [],
          y : [],
          rows : [],
          columns : []
        };

      function redraw_graph() {
        $("#graphtype").html("<b>" + graphtype + "</b>");
        //$("#graphdata").load("ui_fetch.php", selection);
        jQuery.getJSON("ui_fetch.php", selection, function(data) {
          foo(data);
        })
      }

      $(function() {
        $(".connectedSortable").sortable({
          connectWith: ".connectedSortable",
          update : function(event, ui) { 
            if (this.id != "variables") {
              selection[this.id] = $(this).sortable('toArray');
              redraw_graph();
            }
          }
        }).disableSelection();
      });

      $(function() {
        $("#graph").buttonset();
        $("#graph input").click(function() {
          graphtype = this.id;
          redraw_graph();
        })
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
        color : red;
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
      /*.chart rect {
        stroke: white;
        fill: steelblue;
      }*/
      .chart text {
        font-size : 10px;
        font-family : sans-serif;
      }
      .draggable {
        cursor: move;
      }
    </style>	

  </head>
  <body>
  <h1>Bedrijvendynamiek</h1>
  <div class="menu">
    <h3>Graph</h3>
    <form>
      <div id="graph">
        <input type="radio" id="bar" name="radio" checked="checked"/>
          <label for="bar">bar</label>
        <input type="radio" id="line" name="radio" />
          <label for="line">line</label>
        <input type="radio" id="bubble" name="radio" />
          <label for="bubble">bubble</label>
        <input type="radio" id="dot" name="radio" />
          <label for="dot">dot</label>
        <input type="radio" id="mosaic" name="radio" />
          <label for="mosaic">mosaic</label>
      </div>
    </form>

    <h3>X</h3>
    <ul id="x" class="connectedSortable">
    </ul>

    <h3>Y</h3>
    <ul id="y" class="connectedSortable">
    </ul>

    <h3>Rows</h3>
    <ul id="rows" class="connectedSortable">
    </ul>

    <h3>Columns</h3>
    <ul id="columns" class="connectedSortable">
    </ul>

    <h3>Variables</h3>
    <ul id="variables" class="connectedSortable">
      <li class="ui-state-default draggable" id="jaar">Jaar</li>
      <li class="ui-state-default draggable" id="sbi">SBI</li>
      <li class="ui-state-default draggable" id="grootteklasse">Grootteklasse</li>
      <li class="ui-state-default draggable" id="effect">Effect</li>
      <li class="ui-state-default draggable" id="variable">Variable</li>
    </ul>

  </div>

  <div class="graph">
    <div id="graphtype">
    </div>
    <div id="graphdata">
    </div>
  </div>

  </body>
</html>


