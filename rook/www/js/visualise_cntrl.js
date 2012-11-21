function Cntrl() {

  var selection_ = {};
  var filter_ = {};
  var graphtype_;
  var graphs = {};

  var cntrl = {};

  is_valid = function() {
    if (graph_type === undefined || graphs[graphtype] == undefined) 
      return false;
    var graph = graphs[graphtype];
    return graph.is_valid();
  }

  draw = function() {
  }

  fetch_data_and_draw = function() {
    var query = {
      'table' : $(document).getUrlParam("table"),
      'selection' : JSON.stringify(selection),
      'filter' : JSON.stringify(filter)
    };
    jQuery.getJSON('r/fetch.r', query, draw());
  }

  cntrl.redraw = function() {
    if (is_valid()) fetch_data_and_draw();
    return this;
  }

  cntrl.graphtype = function(graphtype) {
    if (!arguments.length) {
      return graphtype_;
    } else {
      graphtype_ = graphtype;
      // TODO possible redraw
      return this;
    }
  }

  cntrl.selection = function(selection) {
    if (!arguments.length) {
      return selection_;
    } else {
      selection_ = selection;
      // TODO possible redraw
      return this;
    }
  }

  cntrl.filter = function(filter) {
    if (!arguments.length) {
      return filter_;
    } else {
      filter_ = filter;
      // TODO possible redraw
      return this;
    }
  }

  return cntrl;
}

