

function validate_bar(selection, variables) {
  // check if required variables are present
  if (selection.y !== undefined && selection.y.length > 0 && 
    selection.size !== undefined && selection.size.length > 0) {
    // check if variables are correct type
    if (variables[selection.y[0]] != "categorical") 
      return "y should be a categorical variable; currently it is a numerical variable";
    if (variables[selection.size[0]] != "numerical") 
      return "size should be a numerical variable; currently it is a categorical variable";
    return true;
  } else {
    return "Drag and drop one categorical variable on y and a numeric one on size.";
  }
}

function draw_bar(data, selection, variables) {
  if (validate_bar(selection, variables)) {
    $('.graph').children().remove();
    var chart = d3.select(".graph").append("svg").attr("class", "chart");
    var barchart = new Barchart;
    var width = $('.graph').width()-10;
    var height = $('.graph').height()-10;
    barchart.width(width).height(height).categorical(selection.y[0]).numeric(selection.size[0]).plot(chart, data);
  }
}

// ============================================================================
// ==== CLASS DEFINITION OF BARCHART                                       ====
// ============================================================================

function Barchart() {
  this.width_ = undefined;
  this.height_ = undefined;
  this.categorical_ = undefined;
  this.numeric_ = undefined;
}

Barchart.prototype.width = function(width) {
  this.width_ = width;
  return this;
}

Barchart.prototype.height = function(height) {
  this.height_ = height;
  return this;
}

Barchart.prototype.categorical = function(categorical) {
  this.categorical_ = categorical;
  return this;
}

Barchart.prototype.numeric = function(numeric) {
  this.numeric_ = numeric;
  return this;
}

Barchart.prototype.plot = function(chart, data) {
  // only plot if variables are set
  if (!this.numeric_ | !this.categorical_) return;
  // settings
  var bar_height = 12;
  var padding_top = 15;
  var padding_left = 100;
  var padding = 5;
  var numeric = this.numeric_;
  var categorical = this.categorical_;
  // set size of canvas
  if (this.width_ === undefined) this.width(400);
  if (this.height_ == undefined) this.height(data.length*bar_height + padding_top + padding);
  chart.attr("width", this.width_).attr("height", this.height_);
  // create scales
  var xmin = d3.min(data, function(d) { return Number(d[numeric]);});
  if (xmin > 0) xmin = 0;
  var xmax = d3.max(data, function(d) { return Number(d[numeric]);});
  if (xmax < 0) xmax = 0;
  var xscale = d3.scale.linear().domain([xmin, xmax]).range([padding_left, this.width_ - padding])
  var yscale = d3.scale.ordinal()
    .domain(data.map(function(d) { return d[categorical];}))
    .rangeBands([padding_top, this.height_-padding]);
  // add bars
  chart.selectAll("rect").data(data).enter().append("rect")
      .attr("x", function(d) { return Math.min(xscale(0), xscale(d[numeric])); })
      .attr("y", function(d) { return yscale(d[categorical]); })
      .attr("width", function(d) { return Math.abs(xscale(0) - xscale(d[numeric])); })
      .attr("height", yscale.rangeBand())
      .attr("fill", "steelblue").attr("stroke", "white");
  // add tooltip to bars
  $('rect').tipsy({
    gravity: 'w',
    html: true,
    title: function() {
      var d = this.__data__;
      return d[categorical] + ': ' + numeric + ' = ' + d[numeric];
    }
  });
  // add grid lines
  chart.selectAll("line").data(xscale.ticks(5))
    .enter().append("line")
      .attr("x1", xscale).attr("x2", xscale)
      .attr("y1", yscale.rangeExtent()[0]).attr("y2", yscale.rangeExtent()[1])
      .style("stroke", "rgba(0,0,0,0.3)");
  // add 0-line
  chart.append("line")
    .attr("x1", xscale(0)).attr("x2", xscale(0))
    .attr("y1", yscale.rangeExtent()[0]).attr("y2", yscale.rangeExtent()[1])
    .style("stroke", "#000000");
  // add tickmarks
  chart.selectAll(".rule").data(xscale.ticks(5))
    .enter().append("text")
      .attr("class", "rule")
      .attr("x", xscale).attr("y", padding_top).attr("dy", -3)
      .attr("text-anchor", "middle").text(String);
  // add labels
  chart.selectAll(".labels").data(data)
    .enter().append("text").attr("class", "label")
      .attr("x", 3)
      .attr("y", function(d) { return yscale(d[categorical]) + yscale.rangeBand() / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .text(function(d) { return d[categorical];});
}

