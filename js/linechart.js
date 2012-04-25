
function validate_line(selection, variables) {
  // check if required variables are present
  if (   selection.x !== undefined && selection.x.length > 0 
    && selection.y !== undefined && selection.y.length > 0
	 ) {
    // check if variables are correct type
/*    if (variables[selection.x[0]] != "numerical") 
      return "x should be a numerical variable; currently it is a categorical variable";
    if (variables[selection.y[0]] != "numerical") 
      return "y should be a numerical variable; currently it is a categorical variable";
*/
    return true;
  } else {
    return "Drag and drop one numerical variable on x and y, and a categorical one on points. " + 
      "A numerical variable on size and a categorical variable on colour is optional.";
    return false;
  }
}

// ============================================================================
// ==== CLASS DEFINITION OF LINECHART                                         ====
// ============================================================================

function LineChart() {
  this.width_ = undefined;
  this.height_ = undefined;
  this.xvar_ = undefined;
  this.yvar_ = undefined;
  this.colourvar_ = undefined;
  this.mapping_ = undefined;
}

LineChart.prototype.mapping = function(_) {
  this.mapping_ = _;
  return this;
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

LineChart.prototype.colourvar = function(colourvar) {
  this.colourvar_ = colourvar;
  return this;
}

LineChart.prototype.plot = function(chart, data) {
  // only plot if variables are set
  var map = this.mapping_.map();
  
  if (this.xvar_ === undefined | !this.yvar_=== undefined ) return;
  // settings
  var padding_left = 55;
  var padding_bottom = 25;
  var padding = 15;
  var xvar = this.xvar_;
  var yvar = this.yvar_;
  var colourvar = this.colourvar_;
  
  // set size of canvas
  chart.attr("width", mapping.width())
       .attr("height", mapping.height())
	   ;
  
  // create scales
  /*var xscale = map.x.scale;
  */
  //map.x.variable(map.x.variable(), "time");
  //map.x.type("time");
  //console.log(map.x.type());
  //console.log("xscale", xscale.domain(), xscale.range());
  //console.log("map.x.scale", map.x.scale.domain());
  var xscale = map.x.scale;  
  var yscale = map.y.scale.nice();
  
  if (colourvar !== undefined) {
    colourscale = d3.scale.category10();
  } 
  
  var dl = d3.svg.line()
     .x(map.x.scaledValue)
     .y(map.y.scaledValue)
	 ;
  
  coldata = (colourvar===undefined)? [data] : d3.values(d3.nest().key(function(d){return d[colourvar];}).map(data));
  
  //console.log(coldata);
  var colgroup = chart.selectAll("g")
       .data(coldata)
	   .enter()
	   .append("g")
	   .style("fill", function(d){ return (colourvar === undefined)? "steelblue" : colourscale(d[0][colourvar]);})
	   ;

  colgroup.append("path")
       .attr("d", function(d){return dl(d);})
	   .attr("stroke", function(d){ return (colourvar === undefined)? "steelblue" : colourscale(d[0][colourvar]);})
	   .attr("fill", "none")
       ;
	   
  //console.log(d);
  // draw points
  
  colgroup.selectAll("circle").data(data).enter().append("circle")
      .attr("cx", map.x.scaledValue)
      .attr("cy", map.y.scaledValue)
      .attr("r", 3)
      .attr("fill", function(d) { return (colourvar === undefined)? "steelblue" : colourscale(d[colourvar]);})
      .attr("fill-opacity", 0.5).attr("stroke", "white").attr("stroke-opacity", 0.5)
	  ;

  // add tooltip to points
  $('circle').tipsy({
    gravity: 'w',
    html: true,
    title: function() {
      var d = this.__data__;
	  return mapping.toLabel(d);
    }
  });
  
  // add grid lines
  if (map.x.type() === "numerical"){
    var xticks = xscale.ticks(5);  
    chart.selectAll(".gridx").data(xscale.ticks(5))
    .enter().append("line").attr("class", "gridx")
      .attr("x1", xscale).attr("x2", xscale)
      .attr("y1", yscale.range()[0]).attr("y2", yscale.range()[1])
      .style("stroke", "rgba(0,0,0,0.3)");
  // add tickmarks
  chart.selectAll(".rulex").data(xscale.ticks(5))
    .enter().append("text").attr("class", "rulex")
      .attr("x", xscale).attr("y", yscale.range()[0]).attr("dy", "1.2em")
      .attr("text-anchor", "middle").text(map.x.format);
 } else {
	  chart.selectAll(".rulex").data(map.x.scale.domain())
		.enter().append("text").attr("class", "rulex")
		  .attr("x", xscale)
		  .attr("y", yscale.range()[0])
		  .attr("dy", "1.2em")
		  .attr("text-anchor", "middle").text(map.x.format);
 }
 
  var xlim = (xscale.rangeExtent || xscale.range)();
  chart.selectAll(".gridy").data(yscale.ticks(5))
    .enter().append("line").attr("class", "gridy")
      .attr("x1", xlim[0]).attr("x2", xlim[1])
      .attr("y1", yscale).attr("y2", yscale)
      .style("stroke", "rgba(0,0,0,0.3)");
  
  // add tickmarks
  chart.selectAll(".ruley").data(yscale.ticks(5))
    .enter().append("text").attr("class", "ruley")
      .attr("y", yscale).attr("x", padding_left-3).attr("dy", "0.35em")
      .attr("text-anchor", "end").text(map.y.format);
}
