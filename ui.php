<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />

    <title>jQuery test</title>

    <!-- jQuery includes -->
    <link type="text/css" href="css/smoothness/jquery-ui-1.8.17.custom.css" rel="stylesheet" />	
    <script type="text/javascript" src="js/jquery-1.7.1.js"></script>
    <script type="text/javascript" src="js/jquery-ui-1.8.17.custom.min.js"></script>

    <!-- D3 includes -->
    <script type="text/javascript" src="js/d3/d3.js"></script>

    <script type="text/javascript">
      var graphtype = "bar";
      var selection = {
          x : [],
          y : [],
          rows : [],
          columns : []
        };
      var data = [];

      function redraw_graph() {
        $("#graphtype").html("<b>" + graphtype + "</b>");
        $("#graphdata").load("ui_fetch.php", selection);
        jQuery.getJSON("ui_fetch.php", selection, function(data) {
          foo(data);
        })
      }

      firsttime = true;
      function foo(data) {
        var h = 15*data.length
        if (firsttime) {
          d3.select("body").append("svg")
            .attr("class", "chart")
          firsttime = false;
        }
        d3.select(".chart *").remove();
        var chart = d3.select(".chart")
          .attr("width", 640)
          .attr("height", h);
        bar_plot(chart, data, 0, 0, 640, h);
      }

      function bar_plot(chart0, data, x, y, width, height, tickmarks) {
        if (tickmarks === undefined) tickmarks = true;
        var yoffset = tickmarks ? 15 : 0;
        // create drawing area
        var chart = chart0.append("g")
          .attr("transform", "translate(" + String(x+110) + "," + String(y+yoffset) + ")");
        // determine minumum, maximum 
        var variables = [];
        var xmin = 0, xmax = 0;
        for (var i = 0; i < data.length; i++) {
          variables.push(data[i].var);
          if (data[i].val > xmax) xmax = data[i].val;
          if (data[i].val < xmin) xmin = data[i].val;
        }
        // create scales
        var x = d3.scale.linear().domain([xmin, xmax]).range([0, width - 110]);
        var y = d3.scale.ordinal().domain(variables).rangeBands([0, height-yoffset]);
        // add grid lines
        chart.selectAll("line").data(x.ticks(5))
          .enter().append("line")
            .attr("x1", x).attr("x2", x).attr("y1", 0).attr("y2", height-yoffset)
            .style("stroke", "#ccc");
        // add bars
        chart.selectAll("rect").data(data)
          .enter().append("rect")
            .attr("x", function(d) { return Math.min(x(0), x(d.val));})
            .attr("y", function(d) { return y(d.var);})
            .attr("width", function(d) { return Math.abs(x(0) - x(d.val));})
            .attr("height", y.rangeBand());
        // add legend
        chart.selectAll("text").data(data)
          .enter().append("text")
            .attr("x", -100)
            .attr("y", function(d) { return y(d.var) + y.rangeBand()/2;})
            .attr("dy", ".35em")
            .attr("text-anchor", "begin")
            .text(function(d) { return d.var;});
        // add tickmarks
        if (tickmarks) {
          chart.selectAll(".rule").data(x.ticks(5))
            .enter().append("text")
              .attr("class", "rule")
              .attr("x", x).attr("y", 0).attr("dy", -3)
              .attr("text-anchor", "middle").text(String);
        }
        // add 0-line
        chart.append("line")
          .attr("x1", x(0)).attr("x2", x(0)).attr("y1", 0).attr("y2", height-yoffset)
          .style("stroke", "#000000");
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
      .chart rect {
        stroke: white;
        fill: steelblue;
      }
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


