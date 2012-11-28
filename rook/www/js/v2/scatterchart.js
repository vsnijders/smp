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

  chart.setValues = function(selection, values){
    selection_ = selection;
    values_ = values;
    // assume x and y are correctly set
    
    var selx = selection.x[0];
    values.x = function(d) {return Number(d[selx]);}

    var sely = selection.y[0];
    values.y = function(d) {return Number(d[sely]);}

    if (selection.colour !== undefined && selection.colour.length){
        var selcolour = selection.colour[0];
        values.colour = function(d){return d[selcolour];};
    }
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

  chart.subdraw = function(data, g) {
    var nesting = d3.nest();

    // may be these can be removed
    selection_ = this.selection();

    //grid
    g.append('rect')
      .attr('width', axes.x.width())
      .attr('height', axes.y.height())
      .attr('fill', '#F0F0F0')
      ;

    g.selectAll('line.hrule').data(axes.y.ticks).enter().append('line')
      .attr('class','hrule')
      .attr('x1', 0).attr('x2', axes.x.width())
      .attr('y1', axes.y.transform_val).attr('y2', axes.y.transform_val)
      .attr('stroke', '#FFFFFF')
      ;

    g.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.transform_val).attr('x2', axes.x.transform_val)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#FFFFFF')
      ;
   //

   //draw data

    g.selectAll('circle').data(data).enter().append('circle')
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
