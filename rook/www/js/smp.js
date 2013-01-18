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
       .data(data).meta(meta_)
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

function Menu(){
  var menu = {};

  var meta_;

  function update_filter() {
    var context = $(this);
    
    if (!context.is('input')) context = $('#' + cntrl.graph());
    
    var filter = {};
    $("input.filter:checked", context.closest(".tab-pane")).each(function() {
      var variable = this.name;
      var level    = this.value;
      if (filter[variable] === undefined) filter[variable] = [];
      filter[variable].push(level);
    });

    cntrl.filter(filter);
  }

  function update_selection(context) {
    if (context === undefined) context = $('#' + cntrl.graph());
    
    var selection = {};
    $("div.plotvariable .droppable", $(context).closest(".tab-pane")).each(function(i, ul) {
      var dimension = $(ul).attr("data-dimension");
      selection[dimension] = [];
      $("li.draggable", $(ul)).each(function(j, li) {
        selection[dimension][j] = $(li).attr("data-variable");
      });
    });
    cntrl.selection(selection);
  }

  function redraw_graph() {
    cntrl.redraw();
  }

  // Checkboxes in the variables section need to behave like a radiobox. This is handled in the 
  // next bit of code.
  function behave_like_radio() {
    var ul = $(this).closest('ul.droppable');
    if (ul.hasClass('variables')) {
      var div = $(this).closest('div.filter');
      $("input:checked", div).not($(this)).attr("checked", false);
    }

    var li = $(this).closest('li');
    var val = $("input:checked", li).val();
    if (!val){
      val = meta_.dimensions[li.data("variable")].default;
    }
    $("span.slice", li).text(" [='"+val+"']")
  }

  function makeCatVar(id, catVar){
        var type = catVar.type;
        if (Array.isArray(type)) type = type.join(" ");
        var li = $("<li>").addClass("draggable " + type)
          .attr("data-variable", id)
          .attr("data-name", catVar.name)
          .text(catVar.name)
          .draggable({
            revert : "invalid",
            axis : "y",
            stack: "div"
          });

        var span = $("<span>")
          .addClass("slice")
          .text(" [='"+catVar.default+"']")
          .appendTo(li)
          ;

        if (catVar.description){
          var info = $("<a>")
            .attr({"href":"#"})
            .addClass("info")
            .html('<i class="icon-info-sign"></i>')
            .popover({ content: markdown.toHTML(catVar.description)
                     , html: true
                     , title: catVar.name
                     , trigger: "hover"
                     })
            .appendTo(li)
        }

        var a = $("<a>").attr("href", "#").addClass("togglefilter")
          .html('<i class="icon-chevron-right"></i>').appendTo(li)
          .click(function() {
            $("i", this).toggleClass('icon-chevron-down');
            $(this).next().toggle('slow');
            return false;
          });


        var div = $("<div>").addClass("filter").appendTo(li).hide();
        var form = $("<form>").appendTo(div);
        $.each(catVar.categories, function(i, cat) {
          var span_c = $("<span>").attr({"class":"color", "data-value": cat.level});
          var span = $("<span>").text(cat.name);
          var label = $("<label>").appendTo(form);
          label.append(span_c);
          span.appendTo(label);
          if (cat.description){
            var info = $("<a>")
              .attr({"href":"#"})
              .addClass("info")
              .html('<i class="icon-info-sign"></i>')
              .popover({ content: markdown.toHTML(cat.description)
                       , html: true
                       , title: cat.name
                       , trigger: "hover"
                       })
              .appendTo(label)
          }
          $("<input>").attr("type", "checkbox").addClass("filter")
            .attr("name", id)
            .val(cat.level)
            .click(behave_like_radio) 
            .click(update_filter)
            .click(cntrl.redraw)
            .prependTo(label);
        });
      return li;
  }

  function makeNumVar(id, numVar){
        var label = numVar.name;
        if (numVar.unit){
          label += " (" + numVar.unit + ")";
        }
        var li = $("<li>").addClass("draggable numeric")
          .attr("data-variable", id).text(label)
          .draggable({
            revert : "invalid",
            axis : "y",
            stack: "div"
          });

        if (numVar.description){
          var info = $("<a>")
            .attr({"href":"#"})
            .addClass("info")
            .html('<i class="icon-info-sign"></i>')
            .popover({ content: markdown.toHTML(numVar.description)
                     , html: true
                     , title: numVar.name
                     , trigger: "hover"
                     })
            .appendTo(li)
        }
        return li;
  }

  // loads the default graph, if available
  function defaultFill(){
    
    $(".tab-pane").each(function(i, tab){
      var id = tab.id;
      var sel;
      if (meta_.defaultgraphs && (sel = meta_.defaultgraphs[id])){
        $.each(sel, function(d, v){
          var dsel = "[data-dimension='"+d+"']";
          var vsel = "[data-variable='"+v+"']";
          $(vsel, tab).appendTo($(dsel,tab));
        })
      }
    })
  }

  // fill up required variables with available variables
  function autoFill(){
    var a = ["time", "categorical", "numeric", "ordered"];
    
    $(".tab-pane").each(function(i, tab){
      $(".required", tab)
      .filter(function(_, ul){return $("li", ul).length==0})
      .each(function(j, pv){
        var vars = $(".variables li", tab);
        for (var v = 0; v < vars.length; v++){
          var el = $(vars[v]);
          for (var c in a){
            if (el.hasClass(a[c]) && $(pv).hasClass(a[c])){
              el.appendTo(pv);
              return;
            }
          }
        }
      })
    })
  }

  // data is the meta data of the table
  menu.render = function(data) {
    meta_ = data;

    // TODO: following code block needs cleanup
    $(".variables").each(function(i, el) {
      // add dimensions to page
      $.each(data.dimensions, function(dim, dat) {
        $(el).append(makeCatVar(dim,dat));
      });
  
      // add variables to page
      $.each(data.variables, function(dim, dat) {
        var li = makeNumVar(dim,dat);
        $(el).append(li)
      });
    });

    defaultFill();
    autoFill();
  
       // Create tabbed pages for each of the graph types
    $("#tabs").tabs();
    // Keep track of which tab = graphtype is selected
    $('a[data-toggle="tab"]').on('shown', function (e) {
      cntrl.graph($(this).text());
      update_selection();
      update_filter();
      redraw_graph();
    });

    // Select first tab
    $('.nav a:first').tab("show");

    // Drag-and-drop of variables on graph dimensions
    $(".droppable").droppable({
      accept: ".draggable",
      activeClass: "droppable_active", 
      hoverClass: "droppable_hover", 
      tolerance : "touch",
      drop: function(event, ui) {
        var granpa = $(this).closest(".tab-pane");
        // move existing variables to variables section
        var old = $(".draggable", $(this));
        old.appendTo($(".variables", granpa));
        // append newly dropped variable to the list
        $(ui.draggable).prependTo($(this)).attr("style", "position:relative");
        // when draggables are moves to the variables section and more than
        // one category is selected; these need to be unselected
        if ($(this).hasClass('variables')) {
          var sel = $("input.filter:checked", $(ui.draggable));
        } else {
          var sel = $("input.filter:checked", old);
        }
        if (sel.length > 1) sel.attr("checked", false);
        // update selection
        update_filter();
        update_selection(this);
        redraw_graph();
      },
      accept : function(draggable) {
        var $draggable = $(draggable);
        var $this = $(this);
        if ($(draggable).parent()[0] == $(this)[0]) return (false);
        
        var a = ["numeric", "categorical", "ordered", "time"];
        for (var v in a){
          if ($this.hasClass(a[v]) && $draggable.hasClass(a[v])){
            return true;
          }
        }
        return $this.hasClass("variables");
      }
    });
  }
  return menu;
};

// The following block needs to be rewritten; without global objects etc. 
// Perhaps function object; svg needs to be invisible
var label_widths = {};
var dummy;
$(function() {
  dummy = d3.select("body").append("svg")
            .style("visibility", "invisible")
            ;
});

function label_width(label) {
  var padding = 5;
  if (label_widths[label]) {
    return (label_widths[label] + padding);
  }
  var text  = dummy.append("text").text(label);
  var length = text[0][0].getComputedTextLength();
  text.remove();
  label_widths[label] = length;
  return (length + padding);
}


// Format a numeric value:
// - Make sure it is rounded to the correct number of decimals (ndec)
// - Use the correct decimal separator (dec)
// - Add a thousands separator (grp)
format_numeric = function(label, unit, ndec, dec, grp) {
  if (isNaN(label)) return '';
  var unit = unit || '';
  var dec = dec || ',';
  var grp = grp || ' ';
  // round number
  if (ndec != undefined) {
    label = label.toFixed(ndec);
  }
  // Following based on code from 
  // http://www.mredkj.com/javascript/numberFormat.html
  x     = label.split('.');
  x1    = x[0];
  x2    = x.length > 1 ? dec + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + grp + '$2');
  }
  return(x1 + x2 + unit);
}



// ============================================================================
// ====                         WILKINSON ALGORITHM                        ====
// ============================================================================


function wilkinson_ii(dmin, dmax, m, calc_label_width, axis_width, mmin, mmax, Q, precision, mincoverage) {
  // ============================ SUBROUTINES =================================

  // The following routine checks for overlap in the labels. This is used in the 
  // Wilkinson labeling algorithm below to ensure that the labels do not overlap.
  function overlap(lmin, lmax, lstep, calc_label_width, axis_width, ndec) {
    var width_max = lstep*axis_width/(lmax-lmin);
    for (var l = lmin; (l - lmax) <= 1E-10; l += lstep) {
      var w  = calc_label_width(l, ndec);
      if (w > width_max) return(true);
    }
    return(false);
  }

  // Perform one iteration of the Wilkinson algorithm
  function wilkinson_step(min, max, k, m, Q, mincoverage) {
    // default values
    Q               = Q         || [10, 1, 5, 2, 2.5, 3, 4, 1.5, 7, 6, 8, 9];
    precision       = precision || [1,  0, 0, 0,  -1, 0, 0,  -1, 0, 0, 0, 0];
    mincoverage     = mincoverage || 0.8;
    m               = m || k;
    // calculate some stats needed in loop
    var intervals   = k - 1;
    var delta       = (max - min) / intervals;
    var base        = Math.floor(Math.log(delta)/Math.LN10);
    var dbase       = Math.pow(10, base);
    // calculate granularity; one of the terms in score
    var granularity = 1 - Math.abs(k-m)/m;
    // initialise end result
    var best = undefined;
    // loop through all possible label positions with given k
    for(var i = 0; i < Q.length; i++) {
      // calculate label positions
      var tdelta = Q[i] * dbase;
      var tmin   = Math.floor(min/tdelta) * tdelta;
      var tmax   = tmin + intervals * tdelta;
      // calculate the number of decimals
      var ndec   = (base + precision[i]) < 0 ? Math.abs(base + precision[i]) : 0;
      // if label positions cover range
      if (tmin <= min && tmax >= max) {
        // calculate roundness and coverage part of score
        var roundness = 1 - (i - (tmin <= 0 && tmax >= 0)) / Q.length
        var coverage  = (max-min)/(tmax-tmin)
        // if coverage high enough
        if (coverage > mincoverage && !overlap(tmin, tmax, tdelta, calc_label_width, axis_width, ndec)) {
          // calculate score
          var tnice = granularity + roundness + coverage
          // if highest score
          if ((best === undefined) || (tnice > best.score)) {
            best = {
                'lmin'  : tmin,
                'lmax'  : tmax,
                'lstep' : tdelta,
                'score' : tnice,
                'ndec'  : ndec
              };
          }
        }
      }
    }
    // return
    return (best);
  }

  // =============================== MAIN =====================================
  // default values
  dmin             = Number(dmin);
  dmax             = Number(dmax);
  if (Math.abs(dmin - dmax) < 1E-10) {
    dmin = 0.96*dmin;
    dmax = 1.04*dmax;
  }
  calc_label_width = calc_label_width || function() { return(0);};
  axis_width       = axis_width || 1;
  Q                = Q         || [10, 1, 5, 2, 2.5, 3, 4, 1.5, 7, 6, 8, 9];
  precision        = precision || [1,  0, 0, 0,  -1, 0, 0,  -1, 0, 0, 0, 0];
  mincoverage      = mincoverage || 0.8;
  mmin             = mmin || 2;
  mmax             = mmax || Math.ceil(6*m);
  // initilise end result
  var best = {
      'lmin'  : dmin,
      'lmax'  : dmax,
      'lstep' : (dmax - dmin),
      'score' : -1E8,
      'ndec'  : 0
    };
  // calculate number of decimal places
  var x = String(best['lstep']).split('.');
  best['ndec'] = x.length > 1 ? x[1].length : 0;
  // loop though all possible numbers of labels
  for (var k = mmin; k <= mmax; k++) { 
    // calculate best label position for current number of labels
    var result = wilkinson_step(dmin, dmax, k, m, Q, mincoverage)
    // check if current result has higher score
    if ((result !== undefined) && ((best === undefined) || (result.score > best.score))) {
      best = result;
    }
  }
  // generate label positions
  var labels = [];
  for (var l = best.lmin; (l - best.lmax) <= 1E-10; l += best.lstep) {
    labels.push(l);
  }
  best['labels'] = labels;
  return(best);
}



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
// ====                           LINEAR Y AXIS                            ====
// ============================================================================

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
}

// ============================================================================
// ====                           LINEAR X AXIS                            ====
// ============================================================================

function LinearXAxis() {
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
      .attr({"x1": axis.scale, "x2": axis.scale
            ,"y1": 0, "y2": 5
           })
      .style("stroke", "#000000");
    axis.canvas().selectAll('text').data(labels_).enter().append('text')
      .attr('x', axis.scale)
      .attr('y', 5).attr('dy', '1.2em')
      .attr('text-anchor', 'middle').text(function(d) { return (d);});
  }

  return axis;
}











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
function Chart(options) {
  var chart = {};

  var empty_ = function(d) {return "<empty>";};
  var data_;
  var meta_;
  var selection_;

  //function to be used for small multiples
  var row_key_;
  var column_key_;

  var canvas_;

  /////////////////////
  // initialize options
  var options = options || {};

  var axes = chart.axes = options.axes || {
    'x' : LinearXAxis(),
    'y' : LinearYAxis(),
    'colour' : ColourAxis()
  };

  var required_ = options.required || [];

  ////////////////////////

  //var empty = chart.empty = function(){return "<empty>";};

  chart.data = function(data) {
    if (!arguments.length) {
      return data_;
    } else {
      data_ = data;
      return this;
    }
  }

  chart.meta = function(meta) {
    if (!arguments.length) {
      return meta_;
    } else {
      meta_ = meta;
      for (axis in axes) axes[axis].meta(meta);
      return this;
    }
  }

  chart.selection = function(selection) {
    if (!arguments.length) {
      return selection_;
    } else {
      selection_ = selection;

      row_key_ = empty_;
      column_key_ = empty_;

      if (selection.row !== undefined && selection.row.length){
        row_key_ = function(d) { return d[selection_.row];};
      }

      if (selection.column !== undefined && selection.column.length){
        var column_sel = selection.column[0];
        column_key_ = function(d) { return d[selection_.column];};
      }

      // connect axes with selection
      for (var v in axes){
        axes[v].variable(selection[v]);
      }

      return this;
    }
  }

  //TODO remove, may be overkill
  chart.canvas = function(canvas) {
    if (!arguments.length) {
      return canvas_;
    } else {
      canvas_ = canvas;
      return this;
    }
  }


  function bands(N, extent, padding){
    var r = extent[1] - extent[0];
    var bandWidth = (r - (N-1)*padding)/N;
    var range = [];
    var offset = extent[0];
    for (var i = 0; i < N; i++){
      range.push(offset);
      offset += bandWidth + padding;
    }
    bands.range = range;
    return {range: range, bandWidth: bandWidth};
  }

  chart.draw = function() {
    
    // update domains of the axes
    for (var v in axes){
      axes[v].meta(meta_).domain(data_);
    }

    var xheight = axes.x.height();
    var ywidth  = axes.y.width()
    
    var width   = canvas_.attr('width');
    var height  = canvas_.attr('height');
    
    var g = canvas_.append('g')
      .attr('class', 'chart')
      .attr('transform', 'translate(' + ywidth + ',0)')
      ;

    var nesting = d3.nest()
      .key(row_key_)
      .key(column_key_)
      ;    
    
    //TODO use meta data in stead of nesting the data itself
    var nested_data = nesting.map(data_);

    var rows     = d3.keys(nested_data);
    var nrow     = rows.length;
    var columns  = d3.keys(nested_data[rows[0]]);
    var ncolumn  = columns.length;

    var margin = { top : 15, 
                   left : axes.y.width(),
                   right : 15,
                   bottom : axes.x.height()
                 };


    var y_bands = bands(nrow, [margin.top, height - margin.bottom], 10);
    var y_cell = d3.scale.ordinal()
      .domain(rows)
      .range(y_bands.range)
      ;

    // TODO: this should probably be in some other location
    var ycenter = (height - margin.bottom - margin.top)/2 + margin.top;
    canvas_.append('text').attr({
        'class'       : 'title',
        'x'           : '5',
        'y'           : ycenter,
        'text-anchor' : 'middle',
        'dy'          : '0.35em',
        'transform'   : "rotate(-90 5 " + ycenter + ")"
      }).text(axes.y.title());

    axes.y.height(y_bands.bandWidth);
    for (var i in rows){
      var row = rows[i];
      var y = y_cell(row);
      var g = canvas_.append('g')
                     .attr('class', 'axis y')
                     .attr('transform', 'translate(' + 0 + ',' + y + ')')
                     ;
      axes.y.canvas(g).draw()

      if (nrow > 1) {
        var hx = width - margin.right;
        var hy = y_bands.bandWidth;
        var handle = canvas_.append('g')
          .attr("class", "handle")
        
        handle.append('rect')
           .attr({ x: hx
                 , y: y
                 , width: 15
                 , height: hy
                 })
           .style({fill: 'silver'})

         var hx = hx + 5;
         var hy =  y + hy/2;

        handle.append('text')
           .attr({ x: hx
                 , y: hy
                 , transform: "rotate(90 "+ hx + " " + hy +")"
                 })
           .style('text-anchor','middle')
           .text(row)
           ;
         }

    }
    
    var x_bands = bands(ncolumn, [margin.left, width - margin.right], 10);

    var x_cell = d3.scale.ordinal()
      .domain(columns)
      .range(x_bands.range)
      ;

    axes.x.width(x_bands.bandWidth);
    for (var i in columns){
      var column = columns[i];
      var g = canvas_.append('g')
                     .attr('class', 'axis x')
                     .attr('transform', 'translate(' + x_cell(column) + ',' + (height-margin.bottom) + ')')
                     ;
      axes.x.canvas(g).draw()

      // handle
      if (ncolumn > 1) {
        var hw = x_bands.bandWidth;

        var handle = canvas_.append('g')
          .attr("class", "handle")
        
        handle.append('rect')
           .attr({ x: x_cell(column)
                 , y: margin.top - 15
                 , width: hw
                 , height: 15}
                 )
           .style({fill: 'silver'})
         handle.append('text')
           .attr({ x: x_cell(column) + x_bands.bandWidth/2
                 , y: margin.top - 5
                 })
           .style('text-anchor','middle')
           .text(column)
           ;
         }
    }

    for (var r in rows){
      var row = rows[r];
      for (var c in columns){
        var column = columns[c];
          var g = canvas_.append('g')
                       .attr('class', 'data')
                       .attr('transform', 'translate('+ x_cell(column) + ',' + y_cell(row) + ')')
                       ;
          
          this.draw_data(nested_data[row][column], g);  
      }
    }

    return this;
  };

  chart.is_valid = function(selection) {
    for (var i = 0; i < required_.length; i++){
      var v = required_[i];
      if (selection[v] === undefined || selection[v].length == 0){
        return false;
      }
    }
    return true;
  }

  ///////////////////////////////////////////////////
  // virtual methods, to be implemented by subclasses
  ///////////////////////////////////////////////////

  chart.draw_data = function(selection) {
    throw "'draw_data' should be implemented on charts"
  }

  return chart;
};
function Linechart() {
  // use basic functionality
  var chart = Chart({
    axes: { x: LinearXAxis(),
            y: LinearYAxis(),
            colour : ColourAxis()
          },
    required: ["x", "y"]
  });
  
  // hack, there is no such thing as "protected" in javascript 
  var axes = chart.axes;
  var selection_;

  function highlightLine(lines){
      lines
         .on("mouseover", function(d){
               d3.selectAll("g.color")
                  .style("stroke-width", function(d1) {return (d1.key != d.key)? 1: 2;})
                  .filter(function(d1) {return (d1.key != d.key)})
                  .style("stroke-opacity", 0.8)
                  .style("fill-opacity", 0.2)
                  ;
            })
         .on("mouseout", function(d){
               d3.selectAll("g.color")
                  .style("stroke-width", 1)
                  .style("stroke-opacity", 1)
                  .style("fill-opacity", 0.5)
                  ;
           })
         ;
      return lines;
  }

  function show_crosshair(points){
    points
      .on("mouseover", function(d){
        d3.selectAll("line.vline")
          .attr("x1", axes.x.transform(d))
          .attr("x2", axes.x.transform(d))
          ;

        d3.selectAll("line.hline")
          .attr("y1", axes.y.transform(d))
          .attr("y2", axes.y.transform(d))
          ;

        d3.selectAll("g.crosshair")
          .style("visibility", "visible");
      })
      .on("mouseout", function(d){
        d3.selectAll("g.crosshair")
          .style("visibility", "hidden");
      })
      return points;
  }

  function draw_grid(g){

    var grid = g.selectAll("g.grid").data([0]);

    grid.enter().append("g")
      .attr('class', 'grid')
      .append('rect')
      .attr('fill', "#F0F0F0")
      ;

    grid.select('rect')
     .attr({ 'width' : axes.x.width()
           , 'height': axes.y.height()
           })

    grid.selectAll('line.hrule').data(axes.y.ticks).enter().append('line')
      .attr('class','hrule')
      .attr('x1', 0).attr('x2', axes.x.width())
      .attr('y1', axes.y.transform_val).attr('y2', axes.y.transform_val)
      .attr('stroke', '#FFFFFF');
    grid.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.transform_val).attr('x2', axes.x.transform_val)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#FFFFFF');

        // crosshair
    var crosshair = g.append("g")
                     .attr('class', 'crosshair')
                     .style("visibility", "hidden")
                     .style("stroke-width", 0.5)
                     .style("stroke", "black")
                     .style("stroke-dasharray", "3 3")
                     ;

    crosshair.append("line")
      .attr({"class":"vline"
            , x1: 0, x2: 0
            , y1: 0, y2: axes.y.height()
            })
      ;

    crosshair.append("line")
      .attr("class", "hline")
      .attr("x1", 0)
      .attr("x2", axes.x.width())
      .attr("y1", 0)
      .attr("y2", 0)
      ;
  }

  chart.draw_data = function(data, g) {
    
    // may be these can be removed
    selection_ = this.selection();
    
    draw_grid(g);

    var groupBy = d3.nest()
       .key(axes.colour.value())
      ;

    byColor_data = groupBy.entries(data);

    // the data!!!
    var g_data = g.append("g").attr('class', 'data');
    
    var line = d3.svg.line()
      .x(axes.x.transform)
      .y(axes.y.transform);

    g_data.selectAll("g.color").data(byColor_data).enter()
      .append("g")
      .attr("class", "color")
      .style("stroke-width", 1) // put all this in CSS
      .style("stroke","white")
      .style("stroke-opacity", 1)
      .style("fill-opacity", 0.5)
      .each(function(d,i){
        var color = axes.colour.scale(d.key);

        var gcolor = d3.select(this)
          .style("fill", color)
          ;

        var values = d.values
          .filter(function(v){ return isFinite(axes.x.transform(v)) && isFinite(axes.y.transform(v))})
          ;

        gcolor.append("path")
         .attr("d", line(values))
         .attr("stroke", color)
         .attr("fill", "none")
         ;

        gcolor.selectAll('circle').data(values).enter().append('circle')
          .attr('cx', axes.x.transform)
          .attr('cy', axes.y.transform)
          .attr('r', 3)
          .call(show_crosshair)
          ;
      })
      .call(highlightLine)
      ;

    $("g.data circle")
      .tipsy({ title: cntrl.toText,
               html: true,
               gravity: $.fn.tipsy.autoBounds(100, "se")
             })
      ;


  }

  return chart;
};
function Scatterchart() {
  
  // use basic functionality
  var chart = Chart({
    axes: { x: LinearXAxis(),
            y: LinearYAxis(),
            unit: ColourAxis(), // just a dummy axis...
            colour : ColourAxis(),
            size: RadiusAxis()
          },
    required: ["x", "y"]
  });
  
  // hack, there is no such thing as "protected" in javascript 
  var axes = chart.axes;
  
  chart.draw_data = function(data, g) {

    var height = axes.y.height();
    var width = axes.x.width();

    //grid
    var grid = g.append("g").attr('class', 'grid');

    grid.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#F0F0F0')
      ;

    grid.selectAll('line.hrule').data(axes.y.ticks).enter().append('line')
      .attr('class','hrule')
      .attr('x1', 0).attr('x2', width)
      .attr('y1', axes.y.scale).attr('y2', axes.y.scale)
      .attr('stroke', '#FFFFFF')
      ;

    grid.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.scale).attr('x2', axes.x.scale)
      .attr('y1', 0).attr('y2', height)
      .attr('stroke', '#FFFFFF')
      ;
    //

    // crosshair
    var crosshair = g.append("g")
                     .attr('class', 'crosshair')
                     .style("visibility", "hidden")
                     .style("stroke-width", 0.5)
                     .style("stroke", "black")
                     .style("stroke-dasharray", "3 3")
                     ;

    crosshair.append("line")
      .attr("class", "vline")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", height)
      ;

    crosshair.append("line")
      .attr("class", "hline")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", 0)
      .attr("y2", 0)
      ;

   //draw data
   var groupBy = d3.nest()
      .key(axes.colour.value());

   var byColor_data = groupBy.entries(data);

   var g_data = g.append("g").attr("class", "data");
   g_data.selectAll("g.color").data(byColor_data).enter()
      .append("g")
      .attr("class", "color")
      .style("stroke-width", 1)
      .style("stroke","white")
      .style("stroke-opacity", 1)
      .style("fill-opacity", 0.5)
      .each(function(d,i){
        var gcolor = d3.select(this)
          .style("fill", axes.colour.scale(d.key))
          .attr('fill-opacity', 0.5)
          ;
        gcolor.selectAll('circle').data(d.values).enter().append('circle')
          .attr('cx', axes.x.transform)
          .attr('cy', axes.y.transform)
          .attr('r', axes.size.transform)
          .call(show_crosshair)
      });

   $("g.data circle")
      .tipsy({ title: cntrl.toText,
               html: true,
               gravity: $.fn.tipsy.autoBounds(100, "se")
             })
      ;
  }

  function show_crosshair(points){
    points
      .on("mouseover", function(d){
        d3.selectAll("line.vline")
          .attr("x1", axes.x.transform(d))
          .attr("x2", axes.x.transform(d))
          ;

        d3.selectAll("line.hline")
          .attr("y1", axes.y.transform(d))
          .attr("y2", axes.y.transform(d))
          ;

        d3.selectAll("g.crosshair")
          .style("visibility", "visible");

        //chart.toText(d);
      })
      .on("mouseout", function(d){
        d3.selectAll("g.crosshair")
          .style("visibility", "hidden");
      })
      return points;
  }

  return chart;
};
// based on marimekko chart gist

function Mosaicchart() {
  
  // use basic functionality
  var chart = Chart({
    axes: { x: LinearXAxis(),
            y: LinearYAxis(),
            colour: ColourAxis(),
            size : LinearXAxis()
          },
    required: ["y", "size"]
  });
  
  // hack, there is no such thing as "protected" in javascript 
  var axes = chart.axes;
  var selection_;

  chart.draw_data = function(data, g) {
    //TODO create Mosaic Axes
    /*
    grid???
    */

    var width = axes.x.width();
    var height = axes.y.height();

    var x_scale = d3.scale.linear().range([0,width]);
    var y_scale = d3.scale.linear().range([0,height]);

    var x_var = axes.x.variable();
    var y_var = axes.y.variable();

    var y_value = function(d){return d[y_var];};
    var x_value = function(d){return d[x_var];};
    var value = axes.size.value();

    var xfractions = d3.nest()
        .key(x_value)
        .entries(data)
        ;

    var sum = xfractions.reduce( 
      function(v, p) {
        return (p.offset = v) + (p.sum = p.values.reduceRight(
          function(v, d) {
            d.parent = p;
            return (d.offset = v) + value(d);
          }
          , 0
          ));
      }
      , 0
      );
    
    var n = d3.format(",d");

    // Add a group for each xfractions.
    var xfractions = g.selectAll(".xfraction")
        .data(xfractions)
      .enter().append("g")
        .attr("class", "xfraction")
        .attr("transform", function(d) { return "translate(" + x_scale(d.offset / sum) + ")"; });

    var yfractions = xfractions.selectAll(".yfraction")
        .data(function(d) { return d.values; })
      .enter().append("rect")
        .attr("class", "yfraction")
        .attr("y", function(d) { return y_scale(d.offset / d.parent.sum); })
        .attr("height", function(d) { return y_scale(value(d) / d.parent.sum); })
        .attr("width", function(d) { return x_scale(d.parent.sum / sum); })
        .style("fill", function(d) { return axes.colour.scale(axes.y.value(d));})
        .style("stroke-width", 2)
        .style("stroke", "white")
        .call(highlight)
        ;

    $("g.data rect")
      .tipsy({ title: cntrl.toText,
               html: true,
               gravity: $.fn.tipsy.autoBounds(100, "se")
             })
      ;
      function highlight(rects){
        rects
          .on("mouseover", function(d){
              var self = this;
              d3.selectAll("rect.yfraction")
                .style("fill-opacity", function(d1){ return (y_value(d1) == y_value(d) 
                                                          && x_value(d1) == x_value(d))? 1 : 0.5 })
           })
          .on("mouseout", function(d){
              d3.selectAll("rect.yfraction")
                .style("fill-opacity", 1)
           })
          ;
      return rects;
    }
  }

  function dim (d, i){
  }

  return chart;
};

function Barchart() {
  // use basic functionality
  var chart = Chart({
    axes: { x: LinearXAxis2(),
            y: CategoricalAxis(),
            colour : ColourAxis()
          },
    required: ["y", "x"]
  });

  var axes = chart.axes;

  chart.draw_data = function(data, g) {
    //grid

    g.append('rect').attr('width', axes.x.width())
      .attr('height', axes.y.height()).attr('fill', '#F0F0F0');

    g.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.scale).attr('x2', axes.x.scale)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#FFFFFF');
    g.selectAll('line.origin').data([0]).enter().append('line')
      .attr('class','origin')
      .attr('x1', axes.x.scale).attr('x2', axes.x.scale)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#000000');


    //data

    var groupBy = d3.nest()
       .key(axes.colour.value())
      ;

    byColor_data = groupBy.entries(data);

    var bands = d3.scale.ordinal()
      .domain(d3.range(byColor_data.length))
      .rangeBands([0, axes.y.barheight()])
      ;

    console.log(byColor_data)
    var bw = bands.rangeBand();

    g.selectAll("g.color").data(byColor_data).enter()
      .append("g").attr("class", "color")
      .each(function(d, i){
        var color = axes.colour.scale(d.key);
        var xzero = axes.x.scale(0); 

        var gcolor = d3.select(this);
        var offset = bands(i);

        gcolor.selectAll('rect.bar').data(d.values).enter().append('rect')
          .attr({'class': 'bar'
                , y: function(d) {
                       return(offset + axes.y.transform(d) - axes.y.barheight()/2)
                     }
                , 'height': bw
                , x: xzero
                , width: function(d) {
                           return(axes.x.transform(d) - xzero);
                          }
                , fill: color
                })
          .call(highlightBar, axes.y.value, axes.colour.value())
          ;
      })


    $("rect.bar")
      .tipsy({ title: cntrl.toText,
               html: true,
               gravity: $.fn.tipsy.autoBounds(100, "w")
             })
      ;


    // cross hair
    var crosshair = g.append("g")
                     .attr('class', 'crosshair')
                     .attr("pointer-events", "none")
                     ;

    crosshair.append("line")
      .attr({"class": "vline"
           , x1: 0, x2: 0
           , y1: 0, y2: axes.y.height()
           })
      ;

  }

  function highlightBar(bars, scale, color){
    bars
       .on("mouseover", function(d,i){
             d3.selectAll("rect.bar").filter(function(d1,i1){
                   return scale(d1) != scale(d) || color(d1) != color(d)
                }) 
                .style("stroke-opacity", 0.6)
                .style("fill-opacity", 0.6)
                ;
             
             d3.selectAll("line.vline")
                .attr("x1", axes.x.transform(d))
                .attr("x2", axes.x.transform(d))
                ;

             d3.selectAll("g.crosshair")
               .style("visibility", "visible");
          })
       .on("mouseout", function(d){
             
             d3.selectAll("rect.bar")
               .style("stroke-opacity", 1)
               .style("fill-opacity", 1)
               ;

             d3.selectAll("g.crosshair")
               .style("visibility", "hidden");

         })
       ;
    return bars;
  }


  return chart;
};


// ============================================================================
// =======                         AXES                                 =======
// ============================================================================

function CategoricalAxis() {
  var axis = Axis();
  
  var variable_;
  var levels_;
  var labels_;
  var width_  = 0;
  var height_ = 0;
  var canvas_;

  var space_ = 2;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      if (Array.isArray(variable)) variable = variable[0];
      variable_ = variable;
      return this;
    }
  }

  axis.value = function(d){
    return d[variable_];
  }

  truncate_labels = function() {
    var max_width_ = 200;
    labels_ = {};
    width_ = 0;
    levels_.forEach(function(level) {
      var truncated_level = level;
      while (label_width(truncated_level+'...') > max_width_) {
        // go back to last whitespace
        truncated_level = truncated_level.replace(/\s\S*$/, '');
      }
      if (truncated_level != level) truncated_level += '...';
      labels_[level] = truncated_level;
      if (label_width(labels_[level]) > width_) width_ = label_width(labels_[level]);
    });
  }

  axis.domain = function(data) {
    var scale  = d3.scale.ordinal();
    var values = data.map(axis.value);
    scale.domain(values);
    levels_ = scale.domain();
    truncate_labels();
    //width_ = d3.max(levels_, function(l) { return(label_width(l));});
    //width_ = d3.max(labels_, function(l) { return(label_width(l));});
    width_ = width_ + 5; // add size of tickmark
    return(this);
  }

  axis.width = function() {
    return width_;
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

  axis.barheight = function() {
    var nlevels = levels_.length;
    var barheight = (height_ - (nlevels-1)*space_) / nlevels;
    return(barheight);
  }

  axis.transform_val = function(value) {
    var barheight = axis.barheight();
    var y = barheight / 2.0;
    for (level in levels_) {
      if (value == levels_[level]) return(y);
      y += barheight + space_;
    }
    return(undefined);
  }

  axis.ticks = function() {
    return(levels_);
  }

  axis.transform = function(d) {
    return (axis.transform_val(axis.value(d)));
  }

  axis.draw = function() {
    canvas_.selectAll("line").data(levels_).enter().append("line")
      .attr("x1", function(d) { return(label_width(labels_[d])+2); })
      .attr("x2", width_)
      .attr("y1", axis.transform_val).attr("y2", axis.transform_val)
      .attr("stroke", "#E0E0E0");
    canvas_.selectAll('text').data(levels_).enter().append('text')
      .attr('x', 0).attr('y', axis.transform_val).attr('dy', '0.35em')
      .attr('text-anchor', 'begin').text(function(d) { return (labels_[d]);})
      .on('mouseover', function(d,i) {
        d3.select(this).text(d);
      })
      .on('mouseout', function(d,i) {
        d3.select(this).text(function(d) { return (labels_[d]);});
      });
  }

  return axis;
}



function LinearXAxis2() {
  var axis = Axis();
  
  var variable_;
  var range_  = [undefined, undefined];
  var width_;
  var height_ = 30;
  var canvas_; 
  var labels_;
  var label_range_;
  var include_origin_ = false;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.include_origin = function() {
    include_origin_ = true;
    return(this);
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, function(d) { return Number(d[variable_]);});
    if (range_[1] < 0) range_[1] = 0;
    if (range_[0] > 0) range_[0] = 0;
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

  axis.transform_val = function(value) {
    var range = label_range_[1] - label_range_[0];
    return (width_ * (value - label_range_[0]) / range);
  }

  axis.scale = axis.transform_val;

  axis.transform = function(value) {
    return (axis.transform_val(value[variable_]));
  }

  axis.ticks = function() {
    return (labels_);
  }

  axis.draw = function() {
    canvas_.selectAll("line").data(labels_).enter().append("line")
      .attr("x1", axis.transform_val).attr("x2", axis.transform_val)
      .attr("y1", 0).attr("y2", 5)
      .attr("stroke", "#000000");
    canvas_.selectAll('text').data(labels_).enter().append('text')
      .attr('x', axis.transform_val)
      .attr('y', 5).attr('dy', '1.2em')
      .attr('text-anchor', 'middle').text(function(d) { return (d);});
  }


  return axis;
}


