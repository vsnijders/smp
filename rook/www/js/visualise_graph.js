
var mapping = Mapping();
var variables = {};

function on_meta_loaded_graph(data) {
  jQuery.each(data.dimensions, function(dim, dat) {
    variables[dim] = "categorical";
  });
  jQuery.each(data.variables, function(dim, dat) {
    variables[dim] = "numerical";
  });
}

function redraw_graph() {
  var validated = false;
  if (graphtype == "bar") {
    validated = validate_bar(selection, variables);
  } else if (graphtype == "mosaic") {
    validated = validate_mosaic(selection, variables);
  } else if (graphtype == "scatter") {
    validated = validate_bubble(selection, variables);
  } else if (graphtype == "line") {
    validated = validate_line(selection, variables);
  } 
  if (validated === true) {
    var query = {
      'table' : $(document).getUrlParam("table"),
      'selection' : JSON.stringify(selection),
      'filter' : JSON.stringify(filter)
    };

    jQuery.getJSON('r/fetch.r', query, function(data) {
      mapping.refresh(data);
      drawchart(data,selection, variables, mapping, graphtype);
    });
  } else {
    $(".graph").html("<p>" + validated + "</p>");
  }
}

