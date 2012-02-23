
function foo(data) {
  var h = 15*data.length
  d3.select(".chart").remove();
  d3.select("body").append("svg")
    .attr("class", "chart");

    var chart = d3.select(".chart");
    bar_plot_1(chart, data, selection);
  /*if (selection.x.length) {
    var chart = d3.select(".chart");
    bar_plot_0(chart, data, selection);
  } else {
    var chart = d3.select(".chart")
      .attr("width", 640)
      .attr("height", h);
    bar_plot(chart, data, 0, 0, 640, h);
  }*/
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
  var barchart = new BarChart;
  barchart.x(0).height(ny*15).width(640).tickmarks().ylim(ymin, ymax).yvar(selection.y[0]);
  for (var i = 0; i < nx; i++) {
    barchart.y(y).plot(chart, data_nested[i].values);
    y = y + ny*15;
  }
}

function bar_plot(chart0, data, x, y, width, height, tickmarks, xmin, xmax) {
  bp = new BarChart;
  var yvar = d3.keys(data[0]);
  yvar = yvar[yvar.length - 2];
  bp.x(x).y(y).width(width).height(height).ylim(xmin, xmax).yvar(yvar);
  if (!tickmarks) bp.no_tickmarks();
  bp.plot(chart0, data);
}

// ============================================================================
// ==== CLASS DEFINITION OF BARCHART                                       ====
// ============================================================================


function BarChart() {
  this.width_ = undefined;
  this.height_ = undefined;
  this.x_ = 0;
  this.y_ = 0;
  this.draw_tickmarks_ = true;
  this.ylim_ = [undefined, undefined];
  this.xvar_ = undefined;
  this.yvar_ = undefined;
  this.vvar_ = "value";
}


BarChart.prototype.width = function(width) {
  this.width_ = width;
  return this;
}

BarChart.prototype.height = function(height) {
  this.height_ = height;
  return this;
}

BarChart.prototype.x = function(x) {
  this.x_ = x;
  return this;
}

BarChart.prototype.y = function(y) {
  this.y_ = y;
  return this;
}

BarChart.prototype.tickmarks = function() {
  this.draw_tickmarks_ = true;
  return this;
}

BarChart.prototype.no_tickmarks = function() {
  this.draw_tickmarks_ = false;
  return this;
}

BarChart.prototype.ylim = function(ymin, ymax) {
  if (ymin === undefined & ymax === undefined) {
    this.ylim = [ymin, ymax];
  } else if (ymax === undefined) {
    ymax = ymin[1];
    ymin = ymin[0];
  }
  this.ylim_ = [ymin, ymax];
  return this;
}

BarChart.prototype.xvar = function(xvar) {
  this.xvar_ = xvar;
  return this;
}

BarChart.prototype.yvar = function(yvar) {
  this.yvar_ = yvar;
  return this;
}

BarChart.prototype.xscale = function(data) {
  var xmin = this.ylim_[0]; 
  var xmax = this.ylim_[1];
  if (xmin === undefined | xmax === undefined) {
    xmin = d3.min(data, function(d) { return Number(d.value);});
    xmax = d3.max(data, function(d) { return Number(d.value);});
    if (xmin > 0) xmin = 0;
    if (xmax < 0) xmax = 0;
  }
  var x = d3.scale.linear().domain([xmin, xmax]).range([0, this.width_ - 110]);
  return x;
}

BarChart.prototype.yscale = function(data) {
  var yoffset = this.draw_tickmarks_ ? 15 : 0;
  var yvar = this.yvar_;
  var y = d3.scale.ordinal()
    .domain(data.map(function(d) { return d[yvar];}))
    .rangeBands([0, this.height_-yoffset]);
  return y;
}

<<<<<<< HEAD
BarChart.prototype.plot_bars = function(chart, data, x, y) {
  var yvar = this.yvar_;
  // add grid lines
  chart.selectAll("line").data(x.ticks(5))
    .enter().append("line")
      .attr("x1", x).attr("x2", x).attr("y1", 0).attr("y2", this.height_-yoffset)
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
  // add 0-line
  chart.append("line")
    .attr("x1", x(0)).attr("x2", x(0)).attr("y1", 0).attr("y2", this.height_-yoffset)
    .style("stroke", "#000000");
}

BarChart.prototype.plot = function(chart, data) {
  // create drawing area
  var yoffset = this.draw_tickmarks_ ? 15 : 0;
  var chart = chart.append("g")
    .attr("transform", "translate(" + String(this.x_+110) + 
        "," + String(this.y_+yoffset) + ")");
=======
BarChart.prototype.draw_bars = function(chart, data) {
>>>>>>> b2b26019c27f15050b10fd4ae809db1a1e5c67d7
  // determine y-variable
  var yvar = this.yvar_;
  // create scales
  var x = this.xscale(data);
  var y = this.yscale(data);
  // add grid lines
  chart.selectAll("line").data(x.ticks(5))
    .enter().append("line")
      .attr("x1", x).attr("x2", x)
      .attr("y1", y.rangeExtent()[0]).attr("y2", y.rangeExtent()[1])
      .style("stroke", "#ccc");
  // colorscale for bars
  var z = d3.scale.category20();
    //.range(colorbrewer.RdBu[9])
  // add bars
  chart.selectAll("rect").data(data)
    .enter().append("rect")
      .attr("x", function(d) { return Math.min(x(0), x(d.value));})
      .attr("y", function(d) { return y(d[yvar]);})
      .attr("width", function(d) { return Math.abs(x(0) - x(d.value));})
      .attr("height", y.rangeBand())
      .attr("fill", function(d,i) { return z(i);});
  // add tooltip to bars
  $('rect').tipsy({
    gravity: 'w',
    html: true,
    title: function() {
      var d = this.__data__;
      return d[yvar] + ': ' + d.value;
    }
  });
  // add legend
  chart.selectAll("text").data(data)
    .enter().append("text")
      .attr("x", -100)
      .attr("y", function(d) { return y(d[yvar]) + y.rangeBand()/2;})
      .attr("dy", ".35em")
      .attr("text-anchor", "begin")
      .text(function(d) { return d[yvar];});
  // add 0-line
  chart.append("line")
    .attr("x1", x(0)).attr("x2", x(0))
    .attr("y1", y.rangeExtent()[0]).attr("y2", y.rangeExtent()[1])
    .style("stroke", "#000000");
}


BarChart.prototype.plot = function(chart, data) {
  // create drawing area
  var yoffset = this.draw_tickmarks_ ? 15 : 0;
  var chart = chart.append("g")
    .attr("transform", "translate(" + String(this.x_+110) + 
        "," + String(this.y_+yoffset) + ")");
  // create scales
  var x = this.xscale(data);
  // add bars
  this.draw_bars(chart, data);
  // add tickmarks
  if (this.draw_tickmarks_) {
    chart.selectAll(".rule").data(x.ticks(5))
      .enter().append("text")
        .attr("class", "rule")
        .attr("x", x).attr("y", 0).attr("dy", -3)
        .attr("text-anchor", "middle").text(String);
  }
}

function bar_plot_1(chart, data, selection) {
  // some constants
  var bar_height = 7;
  var bar_width  = 640;
  var bar_padding = 4;
  var tickmark_height = 15;
  var tickmarks = true;
  // create barchartobject
  var barchart = new BarChart;
  barchart.yvar(selection.y[0]).no_tickmarks().width(bar_width).x(0);
  // determine maximum and minimum values for scale
  var ymin = d3.min(data, function(d) { return Number(d.value);});
  var ymax = d3.max(data, function(d) { return Number(d.value);});
  barchart.ylim(ymin, ymax);
  // calculate height
  var height = data.length*(bar_width+bar_padding) - bar_padding;
  // draw tickmarks
  if (tickmarks) {
    chart.attr("width", bar_width).attr("height", data.length*bar_width);
    chart = chart.append("g").attr("transform", "translate(0, 15)");
    var x = barchart.xscale(data);
    chart.selectAll(".rule").data(x.ticks(5))
      .enter().append("text")
        .attr("class", "rule")
        .attr("x", x).attr("y", 0).attr("dy", -3)
        .attr("text-anchor", "middle").text(String);
  } else {
    chart.attr("width", bar_width).attr("height", data.length*bar_width+tickmark_height);
  }
  // draw bars
  if (selection.x.length == 0) {
    barchart.height(data.length*bar_height);
    barchart.draw_bars(chart, data);
  } else {
    // nest data
    var data_nested = d3.nest()
      .key(function(d) { return d[selection.x[0]]; })
      .entries(data)
    // create barplots
    barchart.height(data_nested[0].values.length*bar_height);
    var y = 0;
    for (var i = 0; i < data_nested.length; i++) {
      var subchart = chart.append("g").attr("transform", "translate(0," + String(y) + ")");
      barchart.draw_bars(subchart, data_nested[i].values)
  // add 0-line
        if (i > 0)
  subchart.append("line")
    .attr("x1", 0).attr("x2", bar_width).attr("y1", -bar_padding/2).attr("y2", -bar_padding/2).style("stroke", "#ccc");
      y += data_nested[i].values.length*bar_height + bar_padding;
    }
  }
}

