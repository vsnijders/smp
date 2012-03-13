
function validate_bubble(selection, variables) {
  // check if required variables are present
  if (selection.x !== undefined && selection.x.length > 0 && 
    selection.y !== undefined && selection.y.length > 0 &&
    selection.points !== undefined && selection.points.length > 0) {
    // check if variables are correct type
    if (variables[selection.x[0]] != "numerical") 
      return "x should be a numerical variable; currently it is a categorical variable";
    if (variables[selection.y[0]] != "numerical") 
      return "y should be a numerical variable; currently it is a categorical variable";
    if (variables[selection.points[0]] != "categorical") 
      return "points should be a categorical variable; currently it is a numerical variable";
    if (selection.size !== undefined && selection.size.length > 0 &&
      variables[selection.size[0]] != "numerical") 
      return "size should be a numerical variable; currently it is a categorical variable";
    if (selection.colour !== undefined && selection.colour.length > 0 &&
      variables[selection.colour[0]] != "categorical") 
      return "colour should be a categorical variable; currently it is a numerical variable";
    return true;
  } else {
    return "Drag and drop one numerical variable on x and y, and a categorical one on points. " + 
      "A numerical variable on size and a categorical variable on colour is optional.";
    return false;
  }
}

function draw_bubble(data, selection, variables) {
  if (validate_bubble(selection, variables)) {
    d3.select(".chart").remove();
    var chart = d3.select(".graph").append("svg").attr("class", "chart");
    var bubble = new Bubble;
    bubble.width(400).height(400).xvar(selection.x[0]).yvar(selection.y[0])
      .sizevar(selection.size[0]).colourvar(selection.colour[0])
      .pointsvar(selection.points[0]).plot(chart, data);
  }
}


// ============================================================================
// ==== CLASS DEFINITION OF BUBBLE                                         ====
// ============================================================================

function Bubble() {
  this.width_ = undefined;
  this.height_ = undefined;
  this.xvar_ = undefined;
  this.yvar_ = undefined;
  this.sizevar_ = undefined;
  this.colourvar_ = undefined;
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

Bubble.prototype.pointsvar = function(pointsvar) {
  this.pointsvar_ = pointsvar;
  return this;
}

Bubble.prototype.sizevar = function(sizevar) {
  this.sizevar_ = sizevar;
  return this;
}

Bubble.prototype.colourvar = function(colourvar) {
  this.colourvar_ = colourvar;
  return this;
}

Bubble.prototype.plot = function(chart, data) {
  // only plot if variables are set
  if (this.xvar_ === undefined | !this.yvar_=== undefined ) return;
  // settings
  var padding_left = 55;
  var padding_bottom = 25;
  var padding = 15;
  var xvar = this.xvar_;
  var yvar = this.yvar_;
  var sizevar = this.sizevar_;
  var pointsvar = this.pointsvar_;
  var colourvar = this.colourvar_;
  // set size of canvas
  if (this.width_ === undefined) this.width(400);
  if (this.height_ == undefined) this.height(400);
  chart.attr("width", this.width_).attr("height", this.height_);
  // create scales
  var xmin = d3.min(data, function(d) { return Number(d[xvar]);});
  var xmax = d3.max(data, function(d) { return Number(d[xvar]);});
  var xscale = d3.scale.linear().domain([xmin, xmax]).range([padding_left, this.width_ - padding]).nice();
  var ymin = d3.min(data, function(d) { return Number(d[yvar]);});
  var ymax = d3.max(data, function(d) { return Number(d[yvar]);});
  var yscale = d3.scale.linear().domain([ymin, ymax]).range([this.height_ - padding, padding_bottom]).nice();
  var sizescale = undefined
  if (sizevar !== undefined) {
    var sizemax = d3.max(data, function(d) { return Math.abs(Number(d[sizevar]));});
    sizescale = d3.scale.linear().domain([0, sizemax]).range([1, 30]);
  }
  var colourscale = undefined
  if (colourvar !== undefined) {
    colourscale = d3.scale.category10();
  }
  // add grid lines
  chart.selectAll(".gridx").data(xscale.ticks(5))
    .enter().append("line").attr("class", "gridx")
      .attr("x1", xscale).attr("x2", xscale)
      .attr("y1", yscale.range()[0]).attr("y2", yscale.range()[1])
      .style("stroke", "rgba(0,0,0,0.3)");
  chart.selectAll(".gridy").data(yscale.ticks(5))
    .enter().append("line").attr("class", "gridy")
      .attr("x1", xscale.range()[0]).attr("x2", xscale.range()[1])
      .attr("y1", yscale).attr("y2", yscale)
      .style("stroke", "rgba(0,0,0,0.3)");
  // draw points
  chart.selectAll("circle").data(data).enter().append("circle")
      .attr("cx", function(d) { return xscale(d[xvar]);})
      .attr("cy", function(d) { return yscale(d[yvar]);})
      .attr("r", function(d) { return sizevar === undefined ? 5 : sizescale(d[sizevar]);})
      .attr("fill", function(d) { return colourvar === undefined ? 'steelblue' : colourscale(d[colourvar]);})
      .attr("fill-opacity", 0.5).attr("stroke", "white").attr("stroke-opacity", 0.5);
  // add tooltip to points
  $('circle').tipsy({
    gravity: 'w',
    html: true,
    title: function() {
      var d = this.__data__;
      var tip = d[pointsvar];
      if (colourvar !== undefined) tip += ' ' + d[colourvar];
      tip += ': ';
      tip += xvar + ' = ' + d[xvar] + ', ' + yvar + ' = ' + d[yvar];
      if (sizevar !== undefined) tip += ', ' + sizevar + ' = ' + d[sizevar];
      return tip;
    }
  });
  // add tickmarks
  chart.selectAll(".rulex").data(xscale.ticks(5))
    .enter().append("text").attr("class", "rulex")
      .attr("x", xscale).attr("y", yscale.range()[0]).attr("dy", "1.2em")
      .attr("text-anchor", "middle").text(String);
  chart.selectAll(".ruley").data(yscale.ticks(5))
    .enter().append("text").attr("class", "ruley")
      .attr("y", yscale).attr("x", padding_left-3).attr("dy", "0.35em")
      .attr("text-anchor", "end").text(String);


}
