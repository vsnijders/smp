function Linechart() {
  // use basic functionality
  var chart = Chart();
  
  // hack, there is no such thing as "protected" in javascript 
  var axes = chart.axes;

  chart.is_valid = function(selection) {
    return (selection.x !== undefined && selection.x.length > 0 &&
      selection.y !== undefined && selection.y.length > 0);
  }

  // initializes axes
  chart.setAxes = function(data, g){

  }

  chart.subdraw = function(data, g) {
    var nesting = d3.nest();

    selection_ = this.selection();

    if (selection_.colour !== undefined && selection_.colour.length) {
      nesting.key(function(d) { return d[selection_.colour];})
    } else {
      nesting.key(function() { return 'empty'; });
    }
    nested_data = nesting.map(data);

    var line = d3.svg.line()
      .x(axes.x.transform)
      .y(axes.y.transform);

    g.append('rect').attr('width', axes.x.width())
      .attr('height', axes.y.height()).attr('fill', '#F0F0F0');

    g.selectAll('line.hrule').data(axes.y.ticks).enter().append('line')
      .attr('class','hrule')
      .attr('x1', 0).attr('x2', axes.x.width())
      .attr('y1', axes.y.transform_val).attr('y2', axes.y.transform_val)
      .attr('stroke', '#FFFFFF');
    g.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.transform_val).attr('x2', axes.x.transform_val)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#FFFFFF');

    for (d in nested_data) {
      var colour = axes.colour.transform(nested_data[d][1]);
      g.append("svg:path").attr("d", line(nested_data[d])).attr('stroke', colour).attr('fill', 'none');
    }
    g.selectAll('circle').data(data).enter().append('circle')
      .attr('cx', axes.x.transform)
      .attr('cy', axes.y.transform)
      .attr('r', 2)
      .attr('fill', axes.colour.transform);
    
  }

  return chart;
};
