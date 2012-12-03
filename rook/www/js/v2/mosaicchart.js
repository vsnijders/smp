// based on marimekko chart gist

function Mosaicchart() {
  
  // use basic functionality
  var chart = Chart({
    axes: { x: LinearXAxis(),
            y: LinearYAxis(),
            colour: ColourAxis(),
            size : LinearXAxis()
          },
    required: ["y", "size"]
  });
  
  // hack, there is no such thing as "protected" in javascript 
  var axes = chart.axes;
  var selection_;

  chart.draw_data = function(data, g) {
    //TODO create Mosaic Axes
    /*
    grid???
    */

    var width = axes.x.width();
    var height = axes.y.height();

    var x_scale = d3.scale.linear().range([0,width]);
    var y_scale = d3.scale.linear().range([0,height]);

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
    
    var n = d3.format(",d");

    // Add a group for each xfractions.
    var xfractions = g.selectAll(".xfraction")
        .data(xfractions)
      .enter().append("svg:g")
        .attr("class", "xfraction")
        .attr("xlink:title", function(d) { return d.key; })
        .attr("transform", function(d) { return "translate(" + x_scale(d.offset / sum) + ")"; });
//        .attr("transform", function(d) { return "translate(" + axes.x.scale(d.offset / sum) + ")"; });

    // Add a rect for each market.
    var yfractions = xfractions.selectAll(".yfraction")
        .data(function(d) { return d.values; })
      .enter().append("svg:a")
        .attr("class", "yfraction")
        .attr("xlink:title", function(d) { return axes.y.value(d) + " " + axes.x.value(d) + ": " + n(value(d)); })
//        .attr("xlink:title", function(d) { return axes.y.value(d) + " " + axes.x.value(d) + ": " + n(value(d)); })
      .append("svg:rect")
//        .attr("y", function(d) { return axes.y.scale(d.offset / d.parent.sum); })
        .attr("y", function(d) { return y_scale(d.offset / d.parent.sum); })
        .attr("height", function(d) { return y_scale(value(d) / d.parent.sum); })
        .attr("width", function(d) { return x_scale(d.parent.sum / sum); })
        .style("fill", function(d) { return axes.colour.scale(axes.y.value()(d));})
        .style("stroke-width", 2)
        .style("stroke", "white")
        ;
    }

  return chart;
};
