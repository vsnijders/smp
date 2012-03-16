
function draw_linechart(data, selection) {
  d3.select(".chart").remove();
  d3.select("body").append("svg")
    .attr("class", "chart");
  var chart = d3.select(".chart");
  var lineChart = new LineChart;
  lineChart.width(300).height(300).xvar(selection.x[0]).yvar(selection.y[0]);
  lineChart.plot(chart, data, selection);
}


// ============================================================================
// ==== CLASS DEFINITION OF LineChart                                         ====
// ============================================================================


function LineChart() {
  this.width_ = undefined;
  this.height_ = undefined;
  this.xvar_ = undefined;
  this.yvar_ = undefined;
  this.vvar_ = "value";
}

LineChart.prototype.width = function(width) {
  this.width_ = width;
  return this;
}

LineChart.prototype.height = function(height) {
  this.height_ = height;
  return this;
}

LineChart.prototype.xvar = function(xvar) {
  this.xvar_ = xvar;
  return this;
}

LineChart.prototype.yvar = function(yvar) {
  this.yvar_ = yvar;
  return this;
}

LineChart.prototype.xscale = function(data) {
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

LineChart.prototype.yscale = function(data) {
  var yoffset = this.draw_tickmarks_ ? 15 : 0;
  var yvar = this.yvar_;
  var y = d3.scale.ordinal()
    .domain(data.map(function(d) { return d[yvar];}))
    .rangeBands([0, this.height_-yoffset]);
  return y;
}


LineChart.prototype.plot = function(chart, data, selection) {
  // some constants
  var space = 3;
  var margin = 15;
  var xvar = this.xvar_;
  var yvar = this.yvar_;
  var vvar = this.vvar_;
  // set size of canvas
  chart.attr("width", this.width_).attr("height", this.height_);
  // nest data
  var datan = d3.nest()
    .key(function(d){ return d[xvar]; }).entries(data)
  // calculate x-factor
  var xtotal = d3.sum(data, function(d) { return Math.abs(d[vvar]);});
  var xfactor = (this.width_ - 2*margin - (datan.length-1)*space)/xtotal;
  // start drawing
  var x = margin;
  for (var i = 0; i < datan.length; i++) {
    // calculate x-coordinates
    var xtotal = d3.sum(datan[i].values, function(d) { return Math.abs(d[vvar]);});
    var width = xtotal*xfactor;
    // calculate y-factor
    var yfactor = (this.height_ - 2*margin - (datan[i].values.length-1)*space)/xtotal;
    // calculate coordinates of rectangles
    var y = margin;
    for (var j = 0; j < datan[i].values.length; j++) {
      var height = Math.abs(datan[i].values[j][vvar])*yfactor;
      datan[i].values[j]["y"] = y;
      datan[i].values[j]["x"] = x;
      datan[i].values[j]["width"] = width;
      datan[i].values[j]["height"] = height;
      y += height + space;
    }
    // draw rectangles
    chart.selectAll("#rect" + i).data(datan[i].values).enter().append("rect")
      .attr("x", function(d) { return d.x; }).attr("y", function(d) { return d.y;})
      .attr("width", function(d) { return d.width;}).attr("height", function(d) { return d.height;})
      .attr("fill", function(d,i) { return d[vvar] < 0 ? "#F00" : "#00F"});
    // add tooltip to rects
    $('rect').tipsy({
      gravity: 'w',
      html: true,
      title: function() {
        var d = this.__data__;
        return d[xvar] + ', ' + d[yvar] + ': ' + d[vvar];
      }
    });
    

    // next x
    x  += width + space;
  }
}