function Linechart() {
  var chart = {};

  var data_;
  var selection_;
  var selector_;

  var canvas_;
  var axes = {
    'x' : LinearXAxis(),
    'y' : LinearYAxis(),
    'colour' : ColourAxis()
  };

  chart.data = function(data) {
    if (!arguments.length) {
      return data_;
    } else {
      data_ = data;
      return this;
    }
  }

  chart.selection = function(selection) {
    if (!arguments.length) {
      return selection_;
    } else {
      selection_ = selection;
            
      return this;
    }
  }

  chart.canvas = function(canvas) {
    if (!arguments.length) {
      return canvas_;
    } else {
      canvas_ = canvas;
      return this;
    }
  }

  chart.is_valid = function(selection) {
    return (selection.x !== undefined && selection.x.length > 0 &&
      selection.y !== undefined && selection.y.length > 0);
  }

  chart.draw = function() {
    console.log("Drawing line chart");
    var xheight = axes.x.variable(selection_.x).domain(data_).height();
    var ywidth  = axes.y.variable(selection_.y).domain(data_).width()
    var width   = canvas_.attr('width');
    var height  = canvas_.attr('height');
    var gwidth  = width - ywidth;
    var gheight = height - xheight;
    var g = canvas_.append('g').attr('class', 'chart')
      .attr('transform', 'translate(' + ywidth + ',0)');

    // Setting of colour domain should probably occur in draw1, as this has 
    // nothing to do with small multiples. However, we need to calculate the
    // domain using the full data set. Perhaps we can avoid this if we use the
    // levels from the meta information on the data.
    if (selection_.colour !== undefined && selection_.colour.length) {
      axes.colour.variable(selection_.colour).domain(data_);
    }

    var nesting = d3.nest();
    if (selection_.row !== undefined && selection_.row.length) {
      nesting.key(function(d) { return d[selection_.row];})
    } else {
      nesting.key(function() { return 'empty'; });
    }
    if (selection_.column !== undefined && selection_.column.length) {
      nesting.key(function(d) { return d[selection_.column];})
    } else {
      nesting.key(function() { return 'empty'; });
    }
    
    var nested_data = nesting.map(data_);
    var rows     = d3.keys(nested_data);
    var nrow     = d3.keys(nested_data).length;
    var columns  = d3.keys(nested_data[d3.keys(nested_data)[0]]);
    var ncolumn  = d3.keys(nested_data[d3.keys(nested_data)[0]]).length;

    var padding  = 5;
    var gheight = (height - xheight - (nrow-1)*padding) / nrow;
    var gwidth  = (width - ywidth - (ncolumn-1)*padding) / ncolumn;
    axes.x.width(gwidth);
    axes.y.height(gheight);
    var y = 0;
    for (var i = 0; i < rows.length; ++i) {
      var row = rows[i];
      var x = 0;
      var g = canvas_.append('g').attr('class', 'chart')
        .attr('transform', 'translate(' + x + ',' + y + ')');
      axes.y.canvas(g).draw()
      x += ywidth;
      for (var j = 0; j < columns.length; ++j) {
        var column = columns[j];
        var g = canvas_.append('g').attr('class', 'chart')
          .attr('transform', 'translate('+ x + ',' + y + ')');
        this.draw1(nested_data[row][column], g);

        if (i == (rows.length - 1)) {
          var g = canvas_.append('g').attr('class', 'chart')
            .attr('transform', 'translate(' + x + ',' + (y + gheight) + ')');
          axes.x.canvas(g).draw() 
        }
        x += gwidth + padding;
      }
      y += gheight + padding;
    }
  }

  chart.draw1 = function(data, g) {

    var nesting = d3.nest();
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

// ============================================================================
// =======                         AXES                                 =======
// ============================================================================

function LinearYAxis() {
  var axis = {};
  
  var variable_;
  var range_  = [undefined, undefined];
  var width_  = 30;
  var height_;
  var canvas_;
  var labels_;
  var label_range_;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, function(d) { return Number(d[variable_]);});
    return(this);
  }

  axis.width = function() {
    return 30;
  }

  axis.height = function(height) {
    if (!arguments.length) {
      return height_;
    } else {
      height_ = height;
      labels_ = wilkinson_ii(range_[0], range_[1], 10, label_width, height_);
      label_range_ = d3.extent(labels_);
      return this;
    }
  }

  axis.canvas = function(canvas) {
    if (!arguments.length) {
      return canvas_;
    } else {
      canvas_ = canvas;
      return this;
    }
  }

  axis.transform_val = function(value) {
    var range = label_range_[1] - label_range_[0];
    var res = (height_ - height_ * (value - label_range_[0]) / range);
    return(res);
  }

  axis.transform = function(value) {
    return(axis.transform_val(value[variable_]));
  }

  axis.ticks = function() {
    return (labels_);
  }

  axis.draw = function() {
    canvas_.selectAll("line").data(labels_).enter().append("line")
      .attr("x1", width_-5).attr("x2", width_)
      .attr("y1", axis.transform_val).attr("y2", axis.transform_val)
      .attr("stroke", "#000000");
    canvas_.selectAll('text').data(labels_).enter().append('text')
      .attr('x', width_-5).attr('y', axis.transform_val).attr('dy', '0.35em')
      .attr('text-anchor', 'end').text(function(d) { return (d);});
  }

  return axis;
}





function LinearXAxis() {
  var axis = {};
  
  var variable_;
  var range_  = [undefined, undefined];
  var width_;
  var height_ = 30;
  var canvas_;
  var labels_;
  var label_range_;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, function(d) { return d[variable_];});
    return(this);
  }

  axis.width = function(width) {
    if (!arguments.length) {
      return width_;
    } else {
      width_ = width;
      labels_ = wilkinson_ii(range_[0], range_[1], 10, label_width, width_);
      label_range_ = d3.extent(labels_);
      return this;
    }
  }

  axis.height = function() {
    return height_;
  }

  axis.canvas = function(canvas) {
    if (!arguments.length) {
      return canvas_;
    } else {
      canvas_ = canvas;
      return this;
    }
  }

  axis.transform_val = function(value) {
    var range = label_range_[1] - label_range_[0];
    return (width_ * (value - label_range_[0]) / range);
  }

  axis.transform = function(value) {
    return (axis.transform_val(value[variable_]));
  }

  axis.ticks = function() {
    return (labels_);
  }

  axis.draw = function() {
    canvas_.selectAll("line").data(labels_).enter().append("line")
      .attr("x1", axis.transform_val).attr("x2", axis.transform_val)
      .attr("y1", 0).attr("y2", 5)
      .attr("stroke", "#000000");
    canvas_.selectAll('text').data(labels_).enter().append('text')
      .attr('x', axis.transform_val)
      .attr('y', 5).attr('dy', '1.2em')
      .attr('text-anchor', 'middle').text(function(d) { return (d);});
  }


  return axis;
}






function ColourAxis() {
  var axis = {};
  
  var variable_;
  var scale_  = d3.scale.category10();
  var width_  = 0;
  var height_ = 0;
  var canvas_;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.domain = function(data) {
    scale_.domain(d3.map(data, function(d) { return d[variabele_];}));
    return(this);
  }

  axis.width = function() {
    return width_;
  }

  axis.height = function() {
    return height_;
  }

  axis.canvas = function(canvas) {
    if (!arguments.length) {
      return canvas_;
    } else {
      canvas_ = canvas;
      return this;
    }
  }

  axis.transform = function(value) {
    if (variable_ === undefined) return ('steelblue');
    return(scale_(value[variable_]));
  }

  axis.draw = function() {
  }


  return axis;
}



