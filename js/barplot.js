
function foo(data) {
  var h = 15*data.length
  d3.select(".chart").remove();
  d3.select("body").append("svg")
    .attr("class", "chart")
  if (selection.x.length) {
    var chart = d3.select(".chart");
    bar_plot_0(chart, data, selection);
  } else {
    var chart = d3.select(".chart")
      .attr("width", 640)
      .attr("height", h);
    bar_plot(chart, data, 0, 0, 640, h);
  }
}

function bar_plot_0(chart, data, selection) {
  // determine maximum and minimum values for scale
  var ymin = d3.min(data, function(d) { return Number(d.value);});
  var ymax = d3.max(data, function(d) { return Number(d.value);});
  // nest data
  var data_nested = d3.nest()
    .key(function(d) { return d[selection.x[0]]; })
    .entries(data)
  // determine number of x and y elements
  var nx = data_nested.length;
  var ny = data_nested[0].values.length;
  // set chart height
  chart.attr("width", 640).attr("height", nx*ny*15);
  // create barplots
  var y = 0;
  for (var i = 0; i < nx; i++) {
    bar_plot(chart, data_nested[i].values, 0, y, 640, ny*15, true, ymin, ymax);
    y = y + ny*15;
  }
}

function bar_plot(chart0, data, x, y, width, height, tickmarks, xmin, xmax) {
  if (tickmarks === undefined) tickmarks = true;
  var yoffset = tickmarks ? 15 : 0;
  // create drawing area
  var chart = chart0.append("g")
    .attr("transform", "translate(" + String(x+110) + "," + String(y+yoffset) + ")");
  // determine y-variable
  var yvar = d3.keys(data[0]);
  yvar = yvar[yvar.length - 2];
  // determine minumum, maximum 
  var variables = [];
  for (var i = 0; i < data.length; i++) {
    variables.push(data[i][yvar]);
  }
  // determine maximum and minimum values for scale
  if (xmin === undefined | xmax === undefined) {
    xmin = d3.min(data, function(d) { return Number(d.value);});
    xmax = d3.max(data, function(d) { return Number(d.value);});
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
      .attr("x", function(d) { return Math.min(x(0), x(d.value));})
      .attr("y", function(d) { return y(d[yvar]);})
      .attr("width", function(d) { return Math.abs(x(0) - x(d.value));})
      .attr("height", y.rangeBand());
  // add legend
  chart.selectAll("text").data(data)
    .enter().append("text")
      .attr("x", -100)
      .attr("y", function(d) { return y(d[yvar]) + y.rangeBand()/2;})
      .attr("dy", ".35em")
      .attr("text-anchor", "begin")
      .text(function(d) { return d[yvar];});
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

