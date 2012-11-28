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

  chart.subdraw = function(data, g) {
    
    // may be these can be removed
    selection_ = this.selection();
    
    var groupBy = d3.nest()
      .key(axes.colour.value())
      ;

    byColor_data = groupBy.map(data);

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


    // the data!!!
    var g_data = g.append("g").attr('class', 'data');
    
    var line = d3.svg.line()
      .x(axes.x.transform)
      .y(axes.y.transform);

    for (d in byColor_data) {
      var colour = axes.colour.transform(byColor_data[d][1]);
      g_data.append("svg:path")
         .attr("d", line(byColor_data[d]))
         .attr('stroke', colour)
         .attr('fill', 'none')
         ;
    }

    g_data.selectAll('circle').data(data).enter().append('circle')
      .attr('cx', axes.x.transform)
      .attr('cy', axes.y.transform)
      .attr('r', 2)
      .attr('fill', axes.colour.transform)
      ;
  }

  return chart;
};
