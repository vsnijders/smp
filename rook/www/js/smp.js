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
       .success(draw);
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
    console.log(selection);
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
  }


  // data is the meta data of the table
  menu.render = function(data) {
    meta_ = data;

    // TODO: following code block needs cleanup
    $(".variables").each(function(i, el) {
      // add dimensions to page
      $.each(data.dimensions, function(dim, dat) {
        var li = $("<li>").addClass("draggable categorical")
          .attr("data-variable", dim).text(dat.name)
          .draggable({
            revert : "invalid",
            axis : "y"
          });
        var a = $("<a>").attr("href", "#").addClass("togglefilter")
          .html('<i class="icon-chevron-right"></i>').appendTo(li)
          .click(function() {
            $("i", this).toggleClass('icon-chevron-down');
            $(this).next().toggle('slow');
            return false;
          });


        var div = $("<div>").addClass("filter").appendTo(li).hide();
        var form = $("<form>").appendTo(div);
        $.each(dat.levels, function(i, lab) {
          var span_c = $("<span>").attr("class", "color category"+i);
          var span = $("<span>").text(lab);
          var label = $("<label>").appendTo(form);
          label.append(span_c);
          span.appendTo(label);
          $("<input>").attr("type", "checkbox").addClass("filter")
            .attr("name", dim)
            .val(lab)
            .click(behave_like_radio) 
            .click(update_filter)
            .click(cntrl.redraw)
            .prependTo(label);
        });
        $(el).append(li);
      });


      // add variables to page
      $.each(data.variables, function(dim, dat) {
        var li = $("<li>").addClass("draggable numeric")
          .attr("data-variable", dim).text(dat.name)
          .draggable({
            revert : "invalid",
            axis : "y"
          });
        $(el).append(li)
      });

    });
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
        
        var a = ["numeric", "categorical"];
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
  if (label_widths[label]) {
    return (label_widths[label]);
  }
  var text  = dummy.append("text").text(label);
  var length = text[0][0].getComputedTextLength();
  text.remove();
  label_widths[label] = length;
  return (length);
}

// ============================================================================
// ====                         WILKINSON ALGORITHM                        ====
// ============================================================================

function wilkinson(dmin, dmax, m, mmin, mmax, Q, mincoverage) {
  // ============================ SUBROUTINES =================================
  function wilkinson_step(min, max, k, m, Q, mincoverage) {
    // default values
    Q               = Q || [10, 1, 5, 2, 2.5, 3, 4, 1.5, 7, 6, 8, 9];
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
      // if label positions cover range
      if (tmin <= min && tmax >= max) {
        // calculate roundness and coverage part of score
        var roundness = 1 - (i - (tmin <= 0 && tmax >= 0)) / Q.length
        var coverage  = (max-min)/(tmax-tmin)
        // if coverage high enough
        if (coverage > mincoverage) {
          // calculate score
          var tnice = granularity + roundness + coverage
          // if highest score
          if ((best === undefined) || (tnice > best.score)) {
            best = {
                'lmin'  : tmin,
                'lmax'  : tmax,
                'lstep' : tdelta,
                'score' : tnice
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
  Q               = Q || [10, 1, 5, 2, 2.5, 3, 4, 1.5, 7, 6, 8, 9];
  mincoverage     = mincoverage || 0.8;
  mmin            = mmin || Math.max(Math.floor(m/2), 2);
  mmax            = mmax || Math.ceil(6*m);
  // initilise end result
  var best = undefined;
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
  for (var l = best.lmin; l <= best.lmax; l += best.lstep) {
    labels.push(l);
  }
  return(labels);
}




// ============================================================================
// ====                     EXTENDED WILKINSON ALGORITHM                   ====
// ============================================================================

function extended(dmin, dmax, m, width, label_width, Q, only_loose, w) {
  // ============================ SUBROUTINES =================================
  function simplicity_(q, Q, j, lmin, lmax, lstep)
  {
    var eps = 1E-12;
    var n = Q.length;
    for (var i = 0; i < Q.length; i++) {
      if (q == Q[i]) break;
    }
    var v = ((lmin % lstep) < eps || (lstep - (lmin % lstep)) < eps) 
      && lmin <= 0 && lmax >=0 ? 1 : 0;
    return (1 - i/(n-1) - j + v);
  }

  function simplicity_max_(q, Q, j)
  {
    var n = Q.length;
    for (var i = 0; i < Q.length; i++) {
      if (q == Q[i]) break;
    }
    var v = 1;
    return(1 - i/(n-1) - j + v);
  }

  function coverage_(dmin, dmax, lmin, lmax)
  {
    var range = dmax-dmin;
    return(1 - 0.5 * 
      (Math.pow(dmax-lmax,2)+Math.pow(dmin-lmin,2)) /
         Math.pow(0.1*range,2));
  }

  function coverage_max_(dmin, dmax, span)
  {
    var range = dmax - dmin;
    if(span > range) {
      var half2 = Math.pow((span-range)/2, 2);
      return (1 - half2 / Math.pow(0.1 * range,2));
    } else {
      return (1);
    }
  }

  function density_(k, m, dmin, dmax, lmin, lmax)
  {
    var r  = (k-1) / (lmax-lmin);
    var rt = (m-1) / (Math.max(lmax,dmax)-Math.min(dmin,lmin));
    return(2 - Math.max( r/rt, rt/r ));
  }

  function density_max_(k, m) {
    return(k >= m ? 2 - (k-1)/(m-1) : 1);
  }

  function legibility_(lmin, lmax, lstep, width, label_width) {
    var width_max = lstep*width/(lmax-lmin);
    if (width_max < 10) return(-1E10);
    for (var l = lmin; l <= lmax; l += lstep) {
      var w  = label_width(String(l));
      if (w > width_max) return(-1E10);
    }
    return(1);
  }

  function legibility_max_(lmin, lmax, lstep, width) {
    return(1);
  }

  // =============================== MAIN =====================================
  dmin        = Number(dmin);
  dmax        = Number(dmax);
  m           = Number(m);
  kmax        = Math.ceil(6*m);
  width       = width ||100;
  label_width = label_width || function(f) { return 0;};
  Q           = Q || [1, 5, 2, 2.5, 4, 3];
  only_loose  = only_loose || false;
  w           = w || [0.25, 0.2, 0.5, 0.05];
  var eps     = 1E-12;
	
  if (dmin > dmax) {
    var temp = dmin;
    dmin = dmax;
    dmax = temp;
  }

  if(dmax - dmin < eps) {
    // if the range is near the floating point limit,
    // generate some equally spaced steps.
    var step = (dmax - dmin) / m;
    var labels = [];
    var label = dmin;
    for (var i = 0; i < m; ++i) {
      labels.push(label);
      label += step;
    }
    return(seq(from=dmin, to=dmax, length.out=m))
  }

  var n = Q.length;
  var best = {
      'lmin'  : dmin,
      'lmax'  : dmax,
      'lstep' : (dmax - dmin),
      'score' : -2
    };
	
  var j = 1;
  while(j < 1E3) {
    for(var q in Q)
    {
      var sm = simplicity_max_(q, Q, j);
      if((w[0]*sm+w[1]+w[2]+w[3]) < best.score) {
        j = 1E7;
        break;
      }
      // loop over tick count
      for (var k = 2; k < kmax; ++k) {
        var dm = density_max_(k, m);  // C#: double dm = max_density(k/space, density);

        if((w[0]*sm+w[1]+w[2]*dm+w[3]) < best.score) break;
      
        delta = (dmax-dmin)/(k+1)/j/q;
        var z = Math.ceil(Math.log(delta)/Math.log(10));

        while(z < 1E6) {			
          var step = j * q * Math.pow(10,z);

          var cm = coverage_max_(dmin, dmax, step*(k-1));

          if ((w[0]*sm+w[1]*cm+w[2]*dm+w[3]) < best.score) break;
          
          var min_start = Math.floor(dmax/step - (k-1))*j;
          var max_start = Math.ceil(dmin/step)*j;

          for (var start = min_start; start <= max_start; ++start) {
            var lmin  = start * (step/j);
            var lmax  = lmin + step*(k-1);

            var s  = simplicity_(q, Q, j, lmin, lmax, step);
            var d  = density_(k, m, dmin, dmax, lmin, lmax);
            var c  = coverage_(dmin, dmax, lmin, lmax);

            if ((w[0]*s+w[1]*c+w[2]*d+w[3]) < best.score) continue;

            var l = legibility_(lmin, lmax, step, width, label_width);

            var score = w[0]*s + w[1]*c + w[2]*d + w[3]*l

            if(score > best.score && (!only_loose || (lmin <= dmin && lmax >= dmax))) {
              best = {"lmin" : lmin, "lmax" : lmax, "lstep" : step, "score" : score};
            }
          }
          z = z + 1;
        }
      }
    }
    j = j + 1;
  }

  // generate label positions
  var labels = [];
  for (var l = best.lmin; l <= best.lmax; l += best.lstep) {
    labels.push(l);
  }
  return(labels);
}


// ============================================================================
// ====                         WILKINSON ALGORITHM                        ====
// ============================================================================

/*function label_overlap(lmin, lmax, lstep, width, label_width) {
  var scale = width/(lmax-lmin);
  var width_label = Math.max(
      label_width(lmax),
      label_width(lmin)
    );
  if (width_label >= (lstep*scale)) return(true);
  return(false);
}*/

function overlap(lmin, lmax, lstep, calc_label_width, axis_width) {
  var width_max = lstep*axis_width/(lmax-lmin);
  for (var l = lmin; l <= lmax; l += lstep) {
    var w  = calc_label_width(String(l));
    if (w > width_max) return(true);
  }
  return(false);
  /*var label_space = 200/(lmax - lmin)*lstep;
  return (label_space < 100);*/
}


function wilkinson_ii(dmin, dmax, m, calc_label_width, axis_width, mmin, mmax, Q, mincoverage) {
  // ============================ SUBROUTINES =================================
  function wilkinson_step(min, max, k, m, Q, mincoverage) {
    // default values
    Q               = Q || [10, 1, 5, 2, 2.5, 3, 4, 1.5, 7, 6, 8, 9];
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
      // if label positions cover range
      if (tmin <= min && tmax >= max) {
        // calculate roundness and coverage part of score
        var roundness = 1 - (i - (tmin <= 0 && tmax >= 0)) / Q.length
        var coverage  = (max-min)/(tmax-tmin)
        // if coverage high enough
        if (coverage > mincoverage && !overlap(tmin, tmax, tdelta, calc_label_width, axis_width)) {
          // calculate score
          var tnice = granularity + roundness + coverage
          // if highest score
          if ((best === undefined) || (tnice > best.score)) {
            best = {
                'lmin'  : tmin,
                'lmax'  : tmax,
                'lstep' : tdelta,
                'score' : tnice
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
  Q                = Q || [10, 1, 5, 2, 2.5, 3, 4, 1.5, 7, 6, 8, 9];
  mincoverage      = mincoverage || 0.8;
  mmin             = mmin || 2;
  mmax             = mmax || Math.ceil(6*m);
  // initilise end result
  var best = {
      'lmin'  : dmin,
      'lmax'  : dmax,
      'lstep' : (dmax - dmin),
      'score' : -1E8
    };
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
  for (var l = best.lmin; l <= best.lmax; l += best.lstep) {
    labels.push(l);
  }
  return(labels);
}


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
  
  var variable_;
  var range_  = [undefined, undefined];
  var width_  = 40;
  var height_;
  var canvas_;
  var labels_;
  var label_range_;
  var value_;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      value_ = function(d) { return parseFloat(d[variable_]);};
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

  axis.width = function() {
    return 40;
  }

  axis.height = function(height) {
    if (!arguments.length) {
      return height_;
    } else {
      height_ = height;
      labels_ = wilkinson_ii(range_[0], range_[1], 10, label_width, height_);
      label_range_ = d3.extent(labels_);
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

  axis.transform_val = function(value) {
    var range = label_range_[1] - label_range_[0];
    var res = (height_ - height_ * (value - label_range_[0]) / range);
    return(res);
  }

  axis.scale = axis.transform_val;

  axis.transform = function(d) {
    return axis.scale(value_(d));
  }

  axis.ticks = function() {
    return (labels_);
  }

  axis.draw = function(label) {
    canvas_.selectAll("line").data(labels_).enter().append("line")
      .attr("x1", width_-5).attr("x2", width_)
      .attr("y1", axis.transform_val).attr("y2", axis.transform_val)
      .attr("stroke", "#000000")
      ;

    canvas_.selectAll('text').data(labels_).enter().append('text')
      .attr('x', width_-5).attr('y', axis.transform_val).attr('dy', '0.35em')
      .attr('text-anchor', 'end').text(function(d) { return (d);});

    return this;
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

  axis.domain = function(data) {
    scale_.domain(d3.map(data, value_));
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
}function Chart(options) {
  var chart = {};

  var empty_ = function(d) {return "<empty>";};
  var data_;
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
      axes[v].domain(data_);
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

  // this should auto fill the required plotting variables
  chart.autofill = function(meta){
    var vars = [];
    for (var i = 0; i < required_.length; i++){
      var pv = required_[i];
      var v = selection[pv];
      if (selection[pv] === undefined || selection[pv].length == 0){
      } else {   
      }
    }    
  }  
  ///////////////////////////////////////////////////
  // virtual methods, to be implemented by subclasses
  ///////////////////////////////////////////////////

  chart.draw_data = function(selection) {
    throw "'draw_data' should be implemented on charts"
  }

  return chart;
};function Linechart() {
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

    var grid = g.append("g").attr('class', 'grid');

    grid.append('rect').attr('width', axes.x.width())
      .attr('height', axes.y.height()).attr('fill', '#F0F0F0');

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
      .attr("class", "vline")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", axes.y.height())
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
        .style("fill", function(d) { return axes.colour.scale(axes.y.value()(d));})
        .style("stroke-width", 2)
        .style("stroke", "white")
        ;

    $("g.data rect")
      .tipsy({ title: cntrl.toText,
               html: true,
               gravity: $.fn.tipsy.autoBounds(100, "se")
             })
      ;
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
      .attr('x1', axes.x.transform_val).attr('x2', axes.x.transform_val)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#FFFFFF');
    g.selectAll('line.origin').data([0]).enter().append('line')
      .attr('class','origin')
      .attr('x1', axes.x.transform_val).attr('x2', axes.x.transform_val)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#000000');


    //data

    g.selectAll('rect.bar').data(data).enter().append('rect')
      .attr('class', 'bar')
      .attr('y', function(d) {
        return(axes.y.transform(d) - axes.y.barheight()/2)
      })
      .attr('height', axes.y.barheight)
      .attr('x', function(d) {
        return(axes.x.transform_val(0));
      })
      .attr('width', function(d) {
        return(axes.x.transform(d) - axes.x.transform_val(0));
      })
      .attr('fill', axes.colour.scale)
      .call(highlightBar, axes.y.value)
      ;

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
      .attr("class", "vline")
      .attr("x1", 0)
      .attr("x2", 0)
      .attr("y1", 0)
      .attr("y2", axes.y.height())
      ;

  }

  function highlightBar(bars, scale){
    bars
       .on("mouseover", function(d,i){
             d3.selectAll("rect.bar").filter(function(d1,i1){ return scale(d1) != scale(d)}) 
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
  var axis = {};
  
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
  var axis = {};
  
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


