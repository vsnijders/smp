function Linechart() {
  // use basic functionality
  var chart = Chart();
  
  // hack, there is no such thing as "protected" in javascript 
  var axes = chart.axes;
  var selection_;
  var values_;

  
  chart.is_valid = function(selection) {
    return (selection.x !== undefined && selection.x.length > 0 &&
      selection.y !== undefined && selection.y.length > 0);
  }

  chart.initAxes = function(selection){
    // may be split creating axes with setting selection on it
    axes.x = LinearXAxis()
       .variable(selection.x);
    axes.y = LinearYAxis()
       .variable(selection.y);
    axes.colour = ColourAxis()
       .variable(selection.colour);
  }

  //sets the axes to the right domains, 
  chart.setDomains = function(data){
    axes.x.domain(data);
    axes.y.domain(data);
    axes.colour.domain(data);
  }


    function highlightLine(lines){
      lines
         .on("mouseover", function(d){
               d3.selectAll("g.color")
                  .style("stroke-width", function(d1) {return (d1.key != d.key)? 1: 2;})
                  .filter(function(d1) {return (d1.key != d.key)})
                  .style("stroke-opacity", 0.2)
                  .style("fill-opacity", 0.2)
                  ;
            })
         .on("mouseout", function(d){
               d3.select(this).style("stroke-width", 1);
               d3.selectAll("g.color")
                  .style("stroke-opacity", 1)
                  .style("fill-opacity", 0.5)
                  ;
           })
         ;
      return lines;
  }


  chart.subdraw = function(data, g) {
    
    // may be these can be removed
    selection_ = this.selection();
    
    //grid
    var grid = g.append("g").attr('class', 'grid');

    grid.append('rect').attr('width', axes.x.width())
      .attr('height', axes.y.height()).attr('fill', '#F0F0F0');

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
      .style("stroke-width", 1)
      .style("stroke","white")
      .style("stroke-opacity", 1)
      .style("fill-opacity", 0.5)
      .each(function(d,i){
        var gcolor = d3.select(this);
        gcolor.append("path")
         .attr("d", line(d.values))
         .attr("stroke", axes.colour.scale(d.key))
         .attr("fill", "none")
         ;

        gcolor.selectAll('circle').data(d.values).enter().append('circle')
          .attr('cx', axes.x.transform)
          .attr('cy', axes.y.transform)
          .attr('r', 3)
          .attr('fill', axes.colour.transform)
          ;
      })
      .call(highlightLine)
      ;

  }

  return chart;
};
