function Scatterchart() {
  
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

  chart.draw_data = function(data, g) {
    var nesting = d3.nest();

    // may be these can be removed
    selection_ = this.selection();

    //grid
    var grid = g.append("g").attr('class', 'grid');

    grid.append('rect')
      .attr('width', axes.x.width())
      .attr('height', axes.y.height())
      .attr('fill', '#F0F0F0')
      ;

    grid.selectAll('line.hrule').data(axes.y.ticks).enter().append('line')
      .attr('class','hrule')
      .attr('x1', 0).attr('x2', axes.x.width())
      .attr('y1', axes.y.transform_val).attr('y2', axes.y.transform_val)
      .attr('stroke', '#FFFFFF')
      ;

    grid.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.transform_val).attr('x2', axes.x.transform_val)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#FFFFFF')
      ;
   //

   //draw data
   var g_data = g.append("g").attr("class", "data");

    g_data.selectAll('circle').data(data).enter().append('circle')
      .attr('cx', axes.x.transform)
      .attr('cy', axes.y.transform)
      .attr('r', axes.size.transform)
//      .attr('r', 5)
      .attr('fill', axes.colour.transform)
      .attr('fill-opacity', 0.5)
      ;
  }

  return chart;
};
