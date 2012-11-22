function Cntrl(table, node) {

  var table_     = table;
  var node_      = node;
  var graph_;
  var graphs_    = {};
  var selection_ = {};
  var filter_    = {};
  // TODO add methods to set width and height
  var width_     = 400;
  var height_    = 400;

  // ==== create the cntrl object ====
  var cntrl = {};

  // ==== management of graphs ====
  cntrl.add_graph = function(name, graph) {
    graphs_[name] = graph;
    if (graph_ === undefined) {
      graph_ = name;
    }
    return this;
  }

  cntrl.graph = function(name) {
    if (!arguments.length) {
      return graph_;
    } else {
      graph_ = name;
      return this;
    }
  }

  // ==== redrawing of graph ====
  is_valid = function() {
    if (graph_ === undefined || graphs_[graph_] == undefined) 
      return false;
    var graph = graphs_[graph_];
    // TODO: meta is probably also needed
    return graph.is_valid(selection_);
  }

  draw = function(data) {
    node_ = $("#graph"); // TODO
    node_.html();
    var canvas = node_.append('svg').attr('class', 'chart')
      .attr('width', width_, 'height', height_);
    graphs_[graph_].data(data).selection(selection_)
      .canvas(canvas).draw();
  }

  cntrl.redraw = function() {
    if (is_valid()) {
      var query = {
        'table' : table_,
        'selection' : JSON.stringify(selection_),
        'filter' : JSON.stringify(filter_)
      };
      jQuery.getJSON('r/fetch.r', query, draw);
    }
    return this;
  }


  // ==== set and get filter and selection ====
  cntrl.selection = function(selection) {
    if (!arguments.length) {
      return selection_;
    } else {
      selection_ = selection;
      return this;
    }
  }

  cntrl.filter = function(filter) {
    if (!arguments.length) {
      return filter_;
    } else {
      filter_ = filter;
      return this;
    }
  }

  return cntrl;
};

