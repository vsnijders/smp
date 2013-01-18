
// ============================================================================
// ====                           AXIS BASE CLASS                          ====
// ============================================================================

function Axis(options){

  var axis = {};

  // Get and set the column/variable from the data which is shown on the axis
  var variable_;
  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  // Extract column from data row d
  axis.value = function(d) {
      return parseFloat(d[variable_]);
  }

  // Get and set meta of data set
  var meta_;
  axis.meta = function(meta) {
    if (!arguments.length) {
      return meta_;
    } else {
      meta_ = meta;
      return this;
    }
  }

  // Get meta of axis variable
  axis.variable_meta = function() {
    if (variable_ == undefined || meta_ == undefined) return undefined;
    // first check variables then dimensions
    var meta = meta_.variables[variable_];
    if (meta != undefined) return meta;
    else return meta_.dimensions[variable_];
  }

  // Set and set the canvas
  var canvas_;
  axis.canvas = function(canvas) {
    if (!arguments.length) {
      return canvas_;
    } else {
      canvas_ = canvas;
      return this;
    }
  }

  // Set and get the title of the graph
  var title_;
  axis.title = function() {
    if (!arguments.length) {
      if (title_ == undefined) {
        if (axis.variable_meta() == undefined) return '';
        var title = axis.variable_meta().name;
        var unit =  axis.variable_meta().unit || '';
        var axis_title = title;
        if (unit.length) axis_title += ' (' + unit + ')';
        return axis_title;
      } else return title_;
      return canvas_;
    } else {
      title_ = title;
      return this;
    }
  }

  return axis;
};

// ============================================================================
// ====                           LINEAR AXIS                              ====
// ============================================================================

function LinearAxis(horizontal) {
  
  var axis = Axis();

  // Some constants; probably need to be moved to a settings file
  var NUMBER_LABELS = 10; // target number of labels of wilkinson algorithm
  var TICK_LENGTH = 4; 
  var TICK_COLOUR = "#000000";
  var PADDING = TICK_LENGTH + 1; // distance of label from graph
  var LEFT_PADDING = 18;  // extra space left of the label
  var FORMAT_DECIMAL = ',';
  var FORMAT_GROUPING = ' ';

  // Variables
  var horizontal_ = horizontal;
  var range_  = [undefined, undefined];
  var depth_  = 40;
  var length_;
  var labels_;
  var label_range_;
  var precision_ = undefined;

  axis.get_tick_unit = function(unit) {
    // when unit had length 1 add it to the tick marks otherwise only display
    // the unit in the axis title
    var unit = axis.variable_meta().unit || '';
    if (unit.length != 1) return '';
    if (unit == '%') return unit;
    return ' ' + unit;
  }

  axis.format = function(value) {
    // Get variable meta
    var meta = axis.variable_meta();
    // Determine if we need a unit after the value
    // when unit had length 1 add it to the tick marks otherwise only display
    // the unit in the axis title
    var unit = unit || '';
    if (unit.length != 1) unit = '';
    else if (unit != '%') unit = ' ' + unit;
    // Determine grouping symbol (no grouping for years)
    var grp = FORMAT_GROUPING;
    if ($.inArray("time", meta.type) != -1) grp ='';
    // Format
    return format_numeric(value, unit, precision_, FORMAT_DECIMAL, grp);
  }

  axis.calc_label_width = function(label, ndec) {
    if (ndec == undefined) ndec = precision_;
    return label_width(axis.format(label));
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, axis.value);
    depth_ = d3.max(range_, axis.calc_label_width) + LEFT_PADDING + PADDING;
    return this;
  }

  axis.length = function(length) {
    if (!arguments.length || length == undefined) {
      return length_;
    } else {
      // set the length
      length_ = length;
      // Calculate labels. This depends on the type of variable: for years we
      // use a different algorithm (we don't want fractional years)
      var meta = axis.variable_meta();
      if ($.inArray("time", meta.type) == -1) {
        // Normal tickmarks
        labels_ = wilkinson_ii(range_[0], range_[1], NUMBER_LABELS, 
                    axis.calc_label_width, length_);
      } else {
        // Year tickmarks
        var nyears = range_[1] - range_[0] + 1;
        labels_ = wilkinson_ii(range_[0], range_[1], nyears, label_width, 
            length_, 2, nyears, [10, 1, 5, 2, 4, 3, 6, 8, 7, 9], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      }
      precision_   = labels_['ndec'];
      label_range_ = [labels_.lmin, labels_.lmax];
      labels_      = labels_['labels'];
      return this;
    }
  }

  axis.depth = function(depth) {
    if (!arguments.length || depth == undefined) {
      return depth_;
    } else {
      depth_ = depth;
      return this;
    }
  }

  axis.width = function(width) {
    if (horizontal_) return axis.length(width);
    else return axis.depth(width);
  }

  axis.height = function(height) {
    if (horizontal_) return axis.depth(height);
    else return axis.length(height);
  }

  axis.transform_val = function(value) {
    var range = label_range_[1] - label_range_[0];
    var res = axis.length() * (value - label_range_[0]) / range;
    // For a vertical axis we want the smallest number at the bottom
    if (!horizontal_) res = axis.length() - res;
    return res;
  }

  axis.scale = axis.transform_val;

  axis.transform = function(d) {
    return axis.scale(axis.value(d));
  }

  axis.ticks = function() {
    return labels_;
  }

  axis.draw = function(label) {
    if (horizontal_) {
      // add ticks
      axis.canvas().selectAll("line").data(labels_).enter().append("line").attr({ 
          'x1'    : axis.scale, 
          'x2'    : axis.scale,
          'stroke': TICK_COLOUR,
          'y1'    : 0,
          'y2'    : TICK_LENGTH
        });
      // add labels to ticks
      axis.canvas().selectAll('text.tickmark').data(labels_).enter().append('text').attr({
          'class'       : 'tickmark',
          'x'           : axis.scale,
          'y'           : PADDING,
          'dy'          : '1.2em',
          'text-anchor' : 'middle'
        }).text(function(d) { 
          return axis.format(d);
        });
    } else {
      // add ticks
      axis.canvas().selectAll("line").data(labels_).enter().append("line").attr({ 
          'x1'    : axis.width()-TICK_LENGTH, 
          'x2'    : axis.width(),
          'stroke': TICK_COLOUR,
          'y1'    : axis.scale,
          'y2'    : axis.scale
        });
      // add labels to ticks
      axis.canvas().selectAll('text.tickmark').data(labels_).enter().append('text').attr({
          'class'       : 'tickmark',
          'x'           : axis.width()-PADDING,
          'y'           : axis.scale,
          'dy'          : '0.35em',
          'text-anchor' : 'end'
        }).text(function(d) { 
          return axis.format(d);
        });
    }
    return this;
  }

  return axis;
}

// ============================================================================
// ====                           LINEAR Y AXIS                            ====
// ============================================================================

function LinearYAxis() {
  var axis = LinearAxis(false);

  return axis;
}

/*
function LinearYAxis() {
  
  var axis = Axis();

  // Some constants; probably need to be moved to a settings file
  var NUMBER_LABELS = 10; // target number of labels of wilkinson algorithm
  var TICK_LENGTH = 4; 
  var TICK_COLOUR = "#000000";
  var PADDING = TICK_LENGTH + 1; // distance of label from graph
  var LEFT_PADDING = 18;  // extra space left of the label

  // Variables
  var range_  = [undefined, undefined];
  var width_  = 40;
  var height_;
  var labels_;
  var label_range_;
  var precision_ = undefined;

  axis.get_tick_unit = function(unit) {
    // when unit had length 1 add it to the tick marks otherwise only display
    // the unit in the axis title
    var unit = axis.variable_meta().unit || '';
    if (unit.length != 1) return '';
    if (unit == '%') return unit;
    return ' ' + unit;
  }

  axis.calc_label_width = function(label, ndec) {
    if (ndec == undefined) ndec = precision_;
    return(label_width(format_numeric(label, axis.get_tick_unit(), ndec)));
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, axis.value);
    return(this);
  }

  axis.width = function() {
    width_ = d3.max(range_, axis.calc_label_width) + LEFT_PADDING + PADDING;
    return(width_);
  }

  axis.height = function(height) {
    if (!arguments.length) {
      return height_;
    } else {
      // set the height
      height_      = height;
      // now that the height is known we can calculate the labels of the axis
      labels_      = wilkinson_ii(range_[0], range_[1], NUMBER_LABELS, 
                       axis.calc_label_width, height_);
      precision_   = labels_['ndec'];
      label_range_ = [labels_.lmin, labels_.lmax];
      labels_      = labels_['labels'];
      return(this);
    }
  }

  axis.transform_val = function(value) {
    var range = label_range_[1] - label_range_[0];
    var res = (height_ - height_ * (value - label_range_[0]) / range);
    return(res);
  }

  axis.scale = axis.transform_val;

  axis.transform = function(d) {
    return(axis.scale(axis.value(d)));
  }

  axis.ticks = function() {
    return(labels_);
  }

  axis.draw = function(label) {
    // add ticks
    axis.canvas().selectAll("line").data(labels_).enter().append("line").attr({ 
        'x1'    : width_-TICK_LENGTH, 
        'x2'    : width_,
        'stroke': TICK_COLOUR,
        'y1'    : axis.scale,
        'y2'    : axis.scale
      });
    // add labels to ticks
    axis.canvas().selectAll('text.tickmark').data(labels_).enter().append('text').attr({
        'class'       : 'tickmark',
        'x'           : width_-PADDING,
        'y'           : axis.scale,
        'dy'          : '0.35em',
        'text-anchor' : 'end'
      }).text(function(d) { 
        return format_numeric(d, axis.get_tick_unit(), precision_);
      });
    return(this);
  }

  return(axis);
}*/

// ============================================================================
// ====                           LINEAR X AXIS                            ====
// ============================================================================

function LinearXAxis() {
  var axis = LinearAxis(true);

  return axis;
}
/*function LinearXAxis() {
  var axis = Axis();
  
  var range_  = [undefined, undefined];
  var width_;
  var height_ = 30;
  var labels_;
  var label_range_;

  axis.domain = function(data) {
    range_ = d3.extent(data, axis.value);
    return(this);
  }

  axis.width = function(width) {
    if (!arguments.length) {
      return width_;
    } else {
      width_ = width;
      // Calculate labels. This depends on the type of variable: for years we
      // use a different algorithm (we don't want fractional years)
      var meta = axis.variable_meta();
      if ($.inArray("time", meta.type) == -1) {
        // Normal tickmarks
        labels_ = wilkinson_ii(range_[0], range_[1], 10, label_width, width_);
      } else {
        // Year tickmarks
        var nyears = range_[1] - range_[0] + 1;
        labels_ = wilkinson_ii(range_[0], range_[1], nyears, label_width, 
            width_, 2, nyears, [10, 1, 5, 2, 4, 3, 6, 8, 7, 9], 
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      }
      
      labels_ = labels_['labels'];
      label_range_ = d3.extent(labels_);
      return this;
    }
  }

  axis.height = function() {
    return height_;
  }

  axis.scale = function(value) {
    var range = label_range_[1] - label_range_[0];
    return (width_ * (value - label_range_[0]) / range);
  }

  axis.transform_val = axis.scale;

  axis.transform = function(d) {
    return(axis.scale(axis.value(d)));
  }

  axis.ticks = function() {
    return (labels_);
  }

  axis.draw = function() {
    axis.canvas().selectAll("line").data(labels_).enter().append("line")
      .attr("x1", axis.scale).attr("x2", axis.scale)
      .attr("y1", 0).attr("y2", 5)
      .attr("stroke", "#000000");
    axis.canvas().selectAll('text').data(labels_).enter().append('text')
      .attr('x', axis.scale)
      .attr('y', 5).attr('dy', '1.2em')
      .attr('text-anchor', 'middle').text(function(d) { return (d);});
  }

  return axis;
}*/











function RadiusAxis() {
  var axis = Axis();
  
  var variable_;
  var scale_  = d3.scale.sqrt();
  var width_  = 0;
  var height_ = 0;
  var canvas_;
  var value_ = d3.functor(5); // maybe move this into a generic empty function

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      if (variable === undefined || variable.length == 0){
        value_ = d3.functor(1);
        scale_.range([0, 5]);
      } else {
        value_ = function(d) {return Number(d[variable_]);};
        scale_.range([0, 20]);
      }
      return this;
    }
  }

  axis.value = function(){
    return value_;
  }

  axis.domain = function(data) {
    scale_.domain([0, d3.max(data, value_)]);
    return this;
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

  axis.scale = scale_;

  axis.transform = function(d) {
    //console.log(d, value_(d));
    return scale_(value_(d));
  }

  axis.draw = function() {
  }
  
  return axis;
}


function ColourAxis() {
  var axis = Axis();
  
  var variable_;
  var scale_  = d3.scale.category10();
  var width_  = 0;
  var height_ = 0;
  var canvas_;
  var value_ = d3.functor("<empty>"); // maybe move this into a generic empty function

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;

      if (variable === undefined || variable.length == 0){
        value_ = d3.functor("<empty>");
      } else {
        value_ = function(d) {return d[variable_];};
      }
      return this;
    }
  }

  axis.scale = scale_;

  axis.value = function(){
    return value_;
  }

  function cols(levels){
    var o = d3.scale.ordinal().domain(levels).rangePoints([0,360], 1);
    var cols = o.range().map(function(h) {
      return d3.hcl(h, 70, 30).toString();
    })
    console.log(cols);
    return cols;
  }

  axis.domain = function(data) {
    
    //HACK!!!!
    var dims = cntrl.meta().dimensions;
    var dim;
    if (dim = dims[variable_]){
      //cols(dim.levels);
      if (dim.categories.length > 10){
        axis.scale = scale_ = d3.scale.category20();
      } else {
        axis.scale = scale_ = d3.scale.category10();        
      }
      scale_.domain(dim.categories.map(function(c){return c.level;}));
    } else {
      scale_.domain(d3.map(data, value_));
    }
    // END HACK

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

  axis.transform = function(d) {
    var t = scale_(value_(d));
    return (isFinite(t)) ? t : 0;
  }

  axis.draw = function() {
  }
  
  return axis;
}
