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
    g.append('rect').attr('width', axes.x.width())
      .attr('height', axes.y.height()).attr('fill', '#F0F0F0');
    g.selectAll('circle').data(data).enter().append('circle')
      .attr('cx', axes.x.transform)
      .attr('cy', axes.y.transform)
      .attr('r', 3)
      .attr('fill', 'steelblue');
    
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
    var res = (height_ - height_ * (value[variable_] - range_[0]) / range);
    if (res < 0) {
      console.log("Aargh");
    }
    return(res);
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
    return (width_ * (value[variable_] - range_[0]) / range);
  }

  axis.draw = function() {
    canvas_.append('rect').attr('width', width_)
      .attr('height', height_).attr('fill', 'blue');
  }


  return axis;
}



