function Cntrl(table, node) {
  var table_     = table;
  var node_      = node;
  var graph_;
  var graphs_    = {};
  var selection_ = {};

  // values_ is an object with corrosponding functions to retrieve data
  var values_    = {};
  var filter_    = {};
  var width_     = 400;
  var height_    = 400;
  var meta_;
  var menu_ = new Menu();

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

  cntrl.meta = function(){
    return meta_;
  }

  cntrl.get_meta = function(){
    R.get_meta(table_)
     .success(function(meta){
        meta_ = meta;
        menu_.render(meta);
     });
    //update stuff?
    return this;
  }

  var toText_template = "<table>{{#variables}}<tr><th style='font-weight:bold;text-align:right'>{{name}}:</th><td>{{value}}</td></tr>{{/variables}}</table>"
  
  cntrl.toText = function(d){
    var d = d3.select(this).datum();

    // TODO add formatting and the likes...

    var vars = meta_.variables;
    var dims = meta_.dimensions;
    var labels = [];
    for (var v in d){
      var name = (vars[v] || dims[v] || {}).name;
      
      if (name === undefined) {
        continue;
      } 
      
      var value = d[v];
      labels.push({name:name, value:value});
    }
    return Mustache.render(toText_template, {variables: labels});
    //return labels;
  }

  cntrl.graph = function(name) {
    if (!arguments.length) {
      return graph_;
    } else {
      graph_ = name;
      return this;
    }
  }

  // ==== size ====
  cntrl.size = function(width, height) {
    if (!arguments.length) {
      return [width_, height_];
    } else {
      width_ = width;
      height_ = height;
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
    node_ = d3.select("#graph"); //TODO
    node_.html("");
    
    var canvas = node_.append('svg').attr(
      {'class':'chart', 
        width : width_, 
        height: height_
      });

    graphs_[graph_]
       .data(data)
       .selection(selection_)
       .canvas(canvas).draw();
  }

  cntrl.redraw = function() {
    if (is_valid()) {
      R.fetch(table_, selection_, filter_)
       .success(draw)
       .success(function(){
        var colScale = graphs_[graph_].axes.colour.scale;
        $("[data-dimension='colour']").each(function(i, colour){
          $("span.color").each(function(_, span){
            $(span).css("background-color", colScale($(span).data("value")));
          })
        })

        $("#title")
           .text(meta_.name)
           .popover({ content: meta_.description
                    , trigger: "hover"
                    , placement: "bottom"
                   })
           ;

        var label = "";
        
        //TODO clean up and move to chart....
        if (meta_.variables[selection_.y]){
          label = meta_.variables[selection_.y].name;
        } else if (meta_.variables[selection_.size]){
          label = meta_.variables[selection_.size].name;
        } else if (meta_.variables[selection_.x]){
          label = meta_.variables[selection_.x].name;
        }
        $("#graphtitle").text(label);
       });
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

