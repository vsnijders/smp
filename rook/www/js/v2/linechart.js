function Linechart() {
  // use basic functionality
  var chart = Chart({
    axes: { x: LinearXAxis(),
            y: LinearYAxis(),
            colour : ColourAxis()
          },
    required: ["x", "y"]
  });
  
  // hack, there is no such thing as "protected" in javascript 
  var axes = chart.axes;
  var selection_;

  function highlightLine(lines){
      lines
         .on("mouseover", function(d){
               d3.selectAll("g.color")
                  .style("stroke-width", function(d1) {return (d1.key != d.key)? 1: 2;})
                  .filter(function(d1) {return (d1.key != d.key)})
                  .style("stroke-opacity", 0.8)
                  .style("fill-opacity", 0.2)
                  ;

               $("ul.color input[value='"+d.key+"']")
                 .parent()
                 .toggleClass("highlight", true);
            })
         .on("mouseout", function(d){
               d3.selectAll("g.color")
                  .style("stroke-width", 1)
                  .style("stroke-opacity", 1)
                  .style("fill-opacity", 0.5)
                  ;
               
               $("ul.color input[value='"+d.key+"']")
                 .parent()
                 .toggleClass("highlight", false);
           })
         ;
      return lines;
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

  function draw_grid(g){

    var grid = g.selectAll("g.grid").data([0]);

    grid.enter().append("g")
      .attr('class', 'grid')
      .append('rect')
      .attr('fill', "#F0F0F0")
      ;

    grid.select('rect')
     .attr({ 'width' : axes.x.width()
           , 'height': axes.y.height()
           })

    grid.selectAll('line.hrule').data(axes.y.ticks).enter().append('line')
      .attr('class','hrule')
      .attr('x1', 0).attr('x2', axes.x.width())
      .attr('y1', axes.y.transform_val).attr('y2', axes.y.transform_val)
      .attr('stroke', '#FFFFFF');
    grid.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.transform_val).attr('x2', axes.x.transform_val)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#FFFFFF');

        // crosshair
    var crosshair = g.append("g")
                     .attr('class', 'crosshair')
                     .style("visibility", "hidden")
                     .style("stroke-width", 0.5)
                     .style("stroke", "black")
                     .style("stroke-dasharray", "3 3")
                     ;

    crosshair.append("line")
      .attr({"class":"vline"
            , x1: 0, x2: 0
            , y1: 0, y2: axes.y.height()
            })
      ;

    crosshair.append("line")
      .attr("class", "hline")
      .attr("x1", 0)
      .attr("x2", axes.x.width())
      .attr("y1", 0)
      .attr("y2", 0)
      ;
  }

  chart.draw_data = function(data, g) {
    
    // may be these can be removed
    selection_ = this.selection();
    
    draw_grid(g);

    var groupBy = d3.nest()
       .key(axes.colour.value())
      ;

    byColor_data = groupBy.entries(data);

    // the data!!!
    var g_data = g.append("g").attr('class', 'data');
    
    var line = d3.svg.line()
      .x(axes.x.transform)
      .y(axes.y.transform);

    g_data.selectAll("g.color").data(byColor_data).enter()
      .append("g")
      .attr("class", "color")
      .style("stroke-width", 1) // put all this in CSS
      .style("stroke","white")
      .style("stroke-opacity", 1)
      .style("fill-opacity", 0.5)
      .each(function(d,i){
        var color = axes.colour.scale(d.key);

        var gcolor = d3.select(this)
          .style("fill", color)
          ;

        var values = d.values
          .filter(function(v){ return isFinite(axes.x.transform(v)) && isFinite(axes.y.transform(v))})
          ;

        gcolor.append("path")
         .attr("d", line(values))
         .attr("stroke", color)
         .attr("fill", "none")
         ;

        gcolor.selectAll('circle').data(values).enter().append('circle')
          .attr('cx', axes.x.transform)
          .attr('cy', axes.y.transform)
          .attr('r', 3)
          .call(show_crosshair)
          ;
      })
      .call(highlightLine)
      ;

    $("g.data circle")
      .tipsy({ title: cntrl.toText,
               html: true,
               gravity: $.fn.tipsy.autoBounds(150, 'se')
             })
      ;


  }

  return chart;
};
