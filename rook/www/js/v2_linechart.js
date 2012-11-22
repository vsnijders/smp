function Linechart() {
  var chart = {};

  var data_;
  var selection_;
  var canvas_;
  var axes = {
    'x' : LinearXAxis(),
    'y' : LinearYAxis()
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
    this.draw1(g, gwidth, gheight);
    var g = canvas_.append('g').attr('class', 'chart')
      .attr('transform', 'translate(0,0)');
    axes.y.height(gheight).canvas(g).draw()
    var g = canvas_.append('g').attr('class', 'chart')
      .attr('transform', 'translate(' + ywidth + ',' + gheight + ')');
    axes.x.width(gwidth).canvas(g).draw()
  }

  chart.draw1 = function(g, width, height) {
    g.append('rect').attr('width', width)
      .attr('height', height).attr('fill', 'gray');
    
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

  axis.width = function() {
    return 30;
  }

  axis.height = function(height) {
    if (!arguments.length) {
      return height_;
    } else {
      height_ = height;
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

  axis.transform = function(value) {
    var range = range_[1] - range_[0];
    return (height - (value - range_[0]) / range);
  }

  axis.draw = function() {
    canvas_.append('rect').attr('width', width_)
      .attr('height', height_).attr('fill', 'red');
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

  axis.transform = function(value) {
    var range = range_[1] - range_[0];
    return (width - (value - range_[0]) / range);
  }

  axis.draw = function() {
    canvas_.append('rect').attr('width', width_)
      .attr('height', height_).attr('fill', 'blue');
  }


  return axis;
}



