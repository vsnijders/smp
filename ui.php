<!DOCTYPE html>
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
        //$("#graphtype").html("<b>" + graphtype + "</b>");
        //$("#graphdata").load("ui_fetch_filter.php", selection);
        jQuery.getJSON("ui_fetch_filter.php", selection, function(data) {
          if (graphtype == "bar") foo(data);
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


      $(function(){
        $('.collapse').click(function() {
          $(this).next().toggle('slow');
          return false;
        }).next().hide();
      });

      $(function(){
        $('.filter').change(function() {
          selection.filter = {};
          $(".filter:checked").each(function() {
            var value = this.value;
            var variable = this.name;
            if (selection.filter[variable] === undefined) 
              selection.filter[variable] = [];
            selection.filter[variable].push(value);
            return (true);
          }) ;
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
        color : black;
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
      <li class="ui-state-default draggable collapseble" id="jaar">
        <span class="ui-icon ui-icon-gear collapse"></span>
        Jaar 
        <div class="collapseblethingy">
          <form>
            <input type="checkbox" class="filter" name="jaar" value="2007">2007</input><br>
            <input type="checkbox" class="filter" name="jaar" value="2008">2008</input><br>
            <input type="checkbox" class="filter" name="jaar" value="2009">2009</input><br>
            <input type="checkbox" class="filter" name="jaar" value="2010">2010</input><br>
            <input type="checkbox" class="filter" name="jaar" value="2011">2011</input><br>
          </form>
        </div>
      </li>
      <li class="ui-state-default draggable collapseble" id="sbi">
        <span class="ui-icon ui-icon-gear collapse"></span>
        SBI
        <div class="collapseblethingy">
          <form>
            <input type="checkbox" value="A" class="filter" name="sbi">A</input><br> 
            <input type="checkbox" value="B" class="filter" name="sbi">B</input><br> 
            <input type="checkbox" value="C" class="filter" name="sbi">C</input><br>
            <input type="checkbox" value="D" class="filter" name="sbi">D</input><br> 
            <input type="checkbox" value="E" class="filter" name="sbi">E</input><br> 
            <input type="checkbox" value="F" class="filter" name="sbi">F</input><br>
            <input type="checkbox" value="G" class="filter" name="sbi">G</input><br> 
            <input type="checkbox" value="H" class="filter" name="sbi">H</input><br> 
            <input type="checkbox" value="I" class="filter" name="sbi">I</input><br>
            <input type="checkbox" value="J" class="filter" name="sbi">J</input><br> 
            <input type="checkbox" value="K" class="filter" name="sbi">K</input><br> 
            <input type="checkbox" value="M" class="filter" name="sbi">M</input><br>
            <input type="checkbox" value="N" class="filter" name="sbi">N</input><br> 
            <input type="checkbox" value="O" class="filter" name="sbi">O</input><br> 
            <input type="checkbox" value="P" class="filter" name="sbi">P</input><br>
            <input type="checkbox" value="Q" class="filter" name="sbi">Q</input><br> 
            <input type="checkbox" value="R" class="filter" name="sbi">R</input><br> 
            <input type="checkbox" value="S" class="filter" name="sbi">S</input><br>
            <input type="checkbox" value="T" class="filter" name="sbi">T</input><br> 
            <input type="checkbox" value="U" class="filter" name="sbi">U</input><br>
          </form>
        </div>
      </li>
      <li class="ui-state-default draggable" id="grootteklasse">
        <span class="ui-icon ui-icon-gear collapse"></span>
        Grootteklasse 
        <div class="collapseblethingy">
          <form>
            <input type="checkbox" value="microbedrijf" class="filter" name="grootteklasse">microbedrijf</input><br>
            <input type="checkbox" value="kleinbedrijf" class="filter" name="grootteklasse">kleinbedrijf</input><br>
            <input type="checkbox" value="middenbedrijf" class="filter" name="grootteklasse">middenbedrijf</input><br>
            <input type="checkbox" value="grootbedrijf" class="filter" name="grootteklasse">grootbedrijf</input><br>
          </form>
        </div>
      </li>
      <li class="ui-state-default draggable" id="effect">
        <span class="ui-icon ui-icon-gear collapse"></span>
        Effect 
        <div class="collapseblethingy">
          <form>
            <input type="checkbox" value="opvoering" class="filter" name="effect">opvoering</input><br>
            <input type="checkbox" value="afvoering" class="filter" name="effect">afvoering</input><br>
          </form>
        </div>
      </li>
      <li class="ui-state-default draggable" id="variable">
        <span class="ui-icon ui-icon-gear collapse"></span>
        Variable 
        <div class="collapseblethingy">
          <form>
            <input type="checkbox" value="afsplitsing" class="filter" name="variable">afsplitsing</input><br>
            <input type="checkbox" value="fusie" class="filter" name="variable">fusie</input><br>
            <input type="checkbox" value="geboorte" class="filter" name="variable">geboorte</input><br>
            <input type="checkbox" value="overname" class="filter" name="variable">overname</input><br>
            <input type="checkbox" value="sterfte" class="filter" name="variable">sterfte</input><br>
            <input type="checkbox" value="uiteenvallen" class="filter" name="variable">uiteenvallen</input><br>
          </form>
        </div>
      </li>
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


