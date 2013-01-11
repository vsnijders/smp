// basic axis functionality
function BaseAxis(options){
  var axis = {};

  var variable_;

  axis.canvas = function(canvas) {
    if (!arguments.length) {
      return canvas_;
    } else {
      canvas_ = canvas;
      return this;
    }
  }

  axis.width = function(){
    return 30;
  }

  axis.height = function(){
    return 30;
  }

  axis.transform = function(d) {
    return this.scale(this.value(d));
  }

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      this.value = this.setValue(variable);
      return this;
    }
  }

  axis.setValue = function(variable){
    return function(d){return Number(d[variable]);};
  }

  return axis;
};

function LinearYAxis() {
  var axis = {};

  // Some constants; probably need to be moved to a settings file
  var NUMBER_LABELS = 10; // target number of labels of wilkinson algorithm
  var TICK_LENGTH = 4; 
  var TICK_COLOUR = "#000000";
  var PADDING = TICK_LENGTH + 1; // distance of label from graph
  var LEFT_PADDING = 5;  // extra space left of the label

  // Variables
  var variable_;
  var range_  = [undefined, undefined];
  var width_  = 40;
  var height_;
  var canvas_;
  var labels_;
  var label_range_;
  var value_;
  var precision_ = 0;

  calc_label_width = function(label, ndec) {
    if (ndec == undefined) ndec = precision_;
    return(label_width(format_numeric(label, ndec)));
  }

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      value_ = function(d) { return parseFloat(d[variable_]);};
      return(this);
    }
  }

  axis.value = function(){
    return(value_);
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, value_);
    return(this);
  }

  axis.width = function() {
    width_ = d3.max(range_, calc_label_width) + LEFT_PADDING + PADDING;
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
                       calc_label_width, height_);
      precision_   = labels_['ndec'];
      label_range_ = [labels_.lmin, labels_.lmax];
      labels_      = labels_['labels'];
      return(this);
    }
  }

  axis.canvas = function(canvas) {
    if (!arguments.length) {
      return canvas_;
    } else {
      canvas_ = canvas;
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
    return(axis.scale(value_(d)));
  }

  axis.ticks = function() {
    return(labels_);
  }

  axis.draw = function(label) {
    canvas_.selectAll("line").data(labels_).enter()
      .append("line")
      .attr({ x1: width_-TICK_LENGTH, x2: width_
            , stroke: TICK_COLOUR
            , y1: axis.scale, y2: axis.scale
            })
      ;

    canvas_.selectAll('text').data(labels_).enter().append('text')
      .attr('x', width_-PADDING).attr('y', axis.scale).attr('dy', '0.35em')
      .attr('text-anchor', 'end').text(function(d) { return(format_numeric(d, precision_));});

    return(this);
  }

  return(axis);
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

  var value_;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      value_ = function(d) { return Number(d[variable_]);};
      return this;
    }
  }

  axis.value = function(){
    return value_;
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, value_);
    return(this);
  }

  axis.width = function(width) {
    if (!arguments.length) {
      return width_;
    } else {
      width_ = width;
      labels_ = wilkinson_ii(range_[0], range_[1], 10, label_width, width_);
      labels_ = labels_['labels'];
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


  axis.scale = function(value) {
    var range = label_range_[1] - label_range_[0];
    return (width_ * (value - label_range_[0]) / range);
  }

  axis.transform_val = axis.scale;

  axis.transform = function(value) {
    return (axis.scale(value[variable_]));
  }

  axis.ticks = function() {
    return (labels_);
  }

  axis.draw = function() {
    canvas_.selectAll("line").data(labels_).enter().append("line")
      .attr("x1", axis.scale).attr("x2", axis.scale)
      .attr("y1", 0).attr("y2", 5)
      .attr("stroke", "#000000");
    canvas_.selectAll('text').data(labels_).enter().append('text')
      .attr('x', axis.scale)
      .attr('y', 5).attr('dy', '1.2em')
      .attr('text-anchor', 'middle').text(function(d) { return (d);});
  }

  return axis;
}

function RadiusAxis() {
  var axis = {};
  
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
  var axis = {};
  
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
