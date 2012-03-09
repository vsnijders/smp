
function draw_mosaic(data, selection) {
  d3.select(".chart").remove();
  var chart = d3.select("body").append("svg").attr("class", "chart");
  var mosaic = new Mosaic;
  mosaic.width(600).height(600).xvar(selection.x[0]).yvar(selection.y[0])
    .vvar(selection.y[1]).plot(chart, data, selection);
}


// ============================================================================
// ==== CLASS DEFINITION OF MOSAIC                                         ====
// ============================================================================


function Mosaic() {
  this.width_ = undefined;
  this.height_ = undefined;
  this.xvar_ = undefined;
  this.yvar_ = undefined;
  this.vvar_ = "value";
}

Mosaic.prototype.width = function(width) {
  this.width_ = width;
  return this;
}

Mosaic.prototype.height = function(height) {
  this.height_ = height;
  return this;
}

Mosaic.prototype.xvar = function(xvar) {
  this.xvar_ = xvar;
  return this;
}

Mosaic.prototype.yvar = function(yvar) {
  this.yvar_ = yvar;
  return this;
}

Mosaic.prototype.vvar = function(vvar) {
  this.vvar_ = vvar;
  return this;
}

Mosaic.prototype.plot = function(chart, data, selection) {
  if (this.vvar_ === undefined | this.yvar_ === undefined | this.xvar_ == undefined) return;
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

