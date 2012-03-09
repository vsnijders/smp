function draw_bubble(data, selection) {
  d3.select(".chart").remove();
  var chart = d3.select("body").append("svg").attr("class", "chart");
  var bubble = new Bubble;
  bubble.width(400).height(400).xvar(selection.x[0]).yvar(selection.y[0])
    .plot(chart, data);
}


// ============================================================================
// ==== CLASS DEFINITION OF BUBBLE                                         ====
// ============================================================================

function Bubble() {
  this.width_ = undefined;
  this.height_ = undefined;
  this.xvar_ = undefined;
  this.yvar_ = undefined;
}

Bubble.prototype.width = function(width) {
  this.width_ = width;
  return this;
}

Bubble.prototype.height = function(height) {
  this.height_ = height;
  return this;
}

Bubble.prototype.xvar = function(xvar) {
  this.xvar_ = xvar;
  return this;
}

Bubble.prototype.yvar = function(yvar) {
  this.yvar_ = yvar;
  return this;
}

Bubble.prototype.plot = function(chart, data) {
  // only plot if variables are set
  if (this.xvar_ === undefined | !this.yvar_=== undefined ) return;
  // settings
  var padding_left = 15;
  var padding_bottom = 15;
  var padding = 5;
  var xvar = this.xvar_;
  var yvar = this.yvar_;
  // set size of canvas
  if (this.width_ === undefined) this.width(400);
  if (this.height_ == undefined) this.height(400);
  chart.attr("width", this.width_).attr("height", this.height_);
  // create scales
  var xmin = d3.min(data, function(d) { return Number(d[xvar]);});
  if (xmin > 0) xmin = 0;
  var xmax = d3.max(data, function(d) { return Number(d[xvar]);});
  if (xmax < 0) xmax = 0;
  var xscale = d3.scale.linear().domain([xmin, xmax]).range([padding_left, this.width_ - padding])
  var ymin = d3.min(data, function(d) { return Number(d[yvar]);});
  if (ymin > 0) ymin = 0;
  var ymax = d3.max(data, function(d) { return Number(d[yvar]);});
  if (ymax < 0) ymax = 0;
  var yscale = d3.scale.linear().domain([ymin, ymax]).range([padding_bottom, this.height_ - padding])
  // draw points
  chart.selectAll("circle").data(data).enter().append("circle")
      .attr("x", function(d) { return xscale(d[xvar]);})
      .attr("x", function(d) { return yscale(d[yvar]);})
      .attr("radius", 5)
      .attr("fill", "steelblue").attr("stroke", "white");


}
