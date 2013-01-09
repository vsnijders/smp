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
    var y_var = axes.y.variable();

    var y_value = function(d){return d[y_var];};
    var x_value = function(d){return d[x_var];};
    var value = axes.size.value();

    var xfractions = d3.nest()
        .key(x_value)
        .entries(data)
        ;

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
      .enter().append("g")
        .attr("class", "xfraction")
        .attr("transform", function(d) { return "translate(" + x_scale(d.offset / sum) + ")"; });

    var yfractions = xfractions.selectAll(".yfraction")
        .data(function(d) { return d.values; })
      .enter().append("rect")
        .attr("class", "yfraction")
        .attr("y", function(d) { return y_scale(d.offset / d.parent.sum); })
        .attr("height", function(d) { return y_scale(value(d) / d.parent.sum); })
        .attr("width", function(d) { return x_scale(d.parent.sum / sum); })
        .style("fill", function(d) { return axes.colour.scale(axes.y.value()(d));})
        .style("stroke-width", 2)
        .style("stroke", "white")
        .call(highlight)
        ;

    $("g.data rect")
      .tipsy({ title: cntrl.toText,
               html: true,
               gravity: $.fn.tipsy.autoBounds(100, "se")
             })
      ;
      function highlight(rects){
        rects
          .on("mouseover", function(d){
              var self = this;
              d3.selectAll("rect.yfraction")
                .style("fill-opacity", function(d1){ return (y_value(d1) == y_value(d) 
                                                          && x_value(d1) == x_value(d))? 1 : 0.5 })
           })
          .on("mouseout", function(d){
              d3.selectAll("rect.yfraction")
                .style("fill-opacity", 1)
           })
          ;
      return rects;
    }
  }

  function dim (d, i){
  }

  return chart;
};
