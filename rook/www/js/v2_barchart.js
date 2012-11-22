
function Barchart() {
  var chart = {};

  var data_;
  var selection_;
  var canvas_;

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
    return (selection.y !== undefined && selection.y.length > 0 &&
      selection.size !== undefined && selection.size.length > 0);
  }

  chart.draw = function() {
    console.log("Drawing bar chart");
  }

  return chart;
};


