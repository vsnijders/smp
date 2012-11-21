
function Barchart() {
  var chart = {};

  chart.is_valid = function(selection) {
    return (selection.y !== undefined && selection.y.length > 0 &&
      selection.size !== undefined && selection.size.length > 0);
  }

  chart.draw = function() {
    console.log("Drawing bar chart");
  }

  return chart;
};


