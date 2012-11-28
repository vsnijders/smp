// based on marimekko chart gist

function Mosaicchart() {
  
  // use basic functionality
  var chart = Chart();
  
  // hack, there is no such thing as "protected" in javascript 
  var axes = chart.axes;
  var selection_;

  
  chart.is_valid = function(selection) {
    return (  selection.x !== undefined && selection.x.length > 0 
           && selection.y !== undefined && selection.y.length > 0
           && selection.size !== undefined && selection.size.length > 0
           );
  }

  chart.initAxes = function(selection){
    // may be split creating axes with setting selection on it
    axes.x = LinearXAxis()
       .variable(selection.x);
    axes.y = LinearYAxis()
       .variable(selection.y);

    // TODO replace next axes with a sensible one
    axes.size = RadiusAxis()
       .variable(selection.size);

    axes.colour = ColourAxis()
       .variable(selection.colour);
  }

  //sets the axes to the right domains, 
  chart.setDomains = function(data){
    axes.x.domain(data);
    axes.y.domain(data);
    axes.size.domain(data);
    axes.colour.domain(data);
  }

  chart.subdraw = function(data, g) {

    /*
    grid???
    */
    var x_var = axes.x.variable();

    var xfractions = d3.nest()
        .key(function(d){return d[x_var]})
        .entries(data);

    var value = axes.size.value();
    var sum = xfractions.reduce( 
      function(v, p) {
        return (p.offset = v) + (p.sum = p.values.reduceRight(
          function(v, d) {
            d.parent = p;
            return (d.offset = v) + value(d);
          }
          , 0
          ));
      }
      , 0
      );
    console.log(sum, xfractions);

    var n = d3.format(",d");

    // Add a group for each xfractions.
    var xfractions = g.selectAll(".xfraction")
        .data(xfractions)
      .enter().append("svg:g")
        .attr("class", "xfraction")
        .attr("xlink:title", function(d) { return d.key; })
        .attr("transform", function(d) { return "translate(" + axes.x.scale(d.offset / sum) + ")"; });

    // Add a rect for each market.
    var yfractions = xfractions.selectAll(".yfraction")
        .data(function(d) { return d.values; })
      .enter().append("svg:a")
        .attr("class", "yfraction")
        .attr("xlink:title", function(d) { return axes.y.value(d) + " " + axes.x.value(d) + ": " + n(value(d)); })
      .append("svg:rect")
        .attr("y", function(d) { return axes.y.scale(d.offset / d.parent.sum); })
        .attr("height", function(d) { return axes.y.scale(value(d) / d.parent.sum); })
        .attr("width", function(d) { return axes.x.scale(d.parent.sum / sum); })
        .style("fill", axes.colour.transform);
    }

  return chart;
};
