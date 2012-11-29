function Scatterchart() {
  
  // use basic functionality
  var chart = Chart({
    axes: { x: LinearXAxis(),
            y: LinearYAxis(),
            colour : ColourAxis(),
            size: RadiusAxis()
          },
    required: ["x", "y"]
  });
  
  // hack, there is no such thing as "protected" in javascript 
  var axes = chart.axes;
  
  chart.draw_data = function(data, g) {

    var height = axes.y.height();
    var width = axes.x.width();

    //grid
    var grid = g.append("g").attr('class', 'grid');

    grid.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#F0F0F0')
      ;

    grid.selectAll('line.hrule').data(axes.y.ticks).enter().append('line')
      .attr('class','hrule')
      .attr('x1', 0).attr('x2', width)
      .attr('y1', axes.y.scale).attr('y2', axes.y.scale)
      .attr('stroke', '#FFFFFF')
      ;

    grid.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.scale).attr('x2', axes.x.scale)
      .attr('y1', 0).attr('y2', height)
      .attr('stroke', '#FFFFFF')
      ;
    //

    // crosshair
    var crosshair = g.append("g")
                     .attr('class', 'crosshair')
                     .style("visibility", "hidden")
                     .style("stroke-width", 0.5)
                     .style("stroke", "black")
                     .style("stroke-dasharray", "3 3")
                     ;

    crosshair.append("line")
      .attr("class", "vline")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", height)
      ;

    crosshair.append("line")
      .attr("class", "hline")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", 0)
      .attr("y2", 0)
      ;

   //draw data
   var groupBy = d3.nest()
      .key(axes.colour.value());

   var byColor_data = groupBy.entries(data);

   var g_data = g.append("g").attr("class", "data");
   g_data.selectAll("g.color").data(byColor_data).enter()
      .append("g")
      .attr("class", "color")
      .style("stroke-width", 1)
      .style("stroke","white")
      .style("stroke-opacity", 1)
      .style("fill-opacity", 0.5)
      .each(function(d,i){
        var gcolor = d3.select(this)
          .style("fill", axes.colour.scale(d.key))
          .attr('fill-opacity', 0.5)
          ;
        gcolor.selectAll('circle').data(d.values).enter().append('circle')
          .attr('cx', axes.x.transform)
          .attr('cy', axes.y.transform)
          .attr('r', axes.size.transform)
          .call(show_crosshair)
      });
  }

  function show_crosshair(points){
    points
      .on("mouseover", function(d){
        d3.selectAll("line.vline")
          .attr("x1", axes.x.transform(d))
          .attr("x2", axes.x.transform(d))
          ;

        d3.selectAll("line.hline")
          .attr("y1", axes.y.transform(d))
          .attr("y2", axes.y.transform(d))
          ;

        d3.selectAll("g.crosshair")
          .style("visibility", "visible");
      })
      .on("mouseout", function(d){
        d3.selectAll("g.crosshair")
          .style("visibility", "hidden");
      })
      return points;
  }

  return chart;
};
