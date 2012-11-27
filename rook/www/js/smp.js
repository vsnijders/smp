function Cntrl(table, node) {

  var table_     = table;
  var node_      = node;
  var graph_;
  var graphs_    = {};
  var selection_ = {};
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
          var label = $("<label>").text(lab).appendTo(form);
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


function Chart() {
  var chart = {};

  var empty = chart.empty = function(){return "<empty>";};

  var data_;
  var selection_;

  var canvas_;

  var axes = {
    'x' : LinearXAxis(),
    'y' : LinearYAxis(),
    'colour' : ColourAxis()
  };

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
    return (selection.x !== undefined && selection.x.length > 0 &&
      selection.y !== undefined && selection.y.length > 0);
  }

  chart.draw = function() {
    console.log("Drawing line chart");

    //initialize axes with data and selection
    var xheight = axes.x.variable(selection_.x).domain(data_).height();
    var ywidth  = axes.y.variable(selection_.y).domain(data_).width()
    
    var width   = canvas_.attr('width');
    var height  = canvas_.attr('height');
    
    var gwidth  = width - ywidth;
    var gheight = height - xheight;
    
    var g = canvas_.append('g').attr('class', 'chart')
      .attr('transform', 'translate(' + ywidth + ',0)');

    // Setting of colour domain should probably occur in draw1, as this has 
    // nothing to do with small multiples. However, we need to calculate the
    // domain using the full data set. Perhaps we can avoid this if we use the
    // levels from the meta information on the data.
    if (selection_.colour !== undefined && selection_.colour.length) {
      axes.colour.variable(selection_.colour).domain(data_);
    }

    var nesting = d3.nest();

    if (selection_.row !== undefined && selection_.row.length) {
      nesting.key(function(d) { return d[selection_.row];})
    } else {
      nesting.key(function() { return 'empty'; });
    }
    if (selection_.column !== undefined && selection_.column.length) {
      nesting.key(function(d) { return d[selection_.column];})
    } else {
      nesting.key(function() { return 'empty'; });
    }
    
    var nested_data = nesting.map(data_);
    var rows     = d3.keys(nested_data);
    var nrow     = d3.keys(nested_data).length;
    var columns  = d3.keys(nested_data[d3.keys(nested_data)[0]]);
    var ncolumn  = d3.keys(nested_data[d3.keys(nested_data)[0]]).length;

    var padding  = 5;
    var gheight = (height - xheight - (nrow-1)*padding) / nrow;
    var gwidth  = (width - ywidth - (ncolumn-1)*padding) / ncolumn;
    axes.x.width(gwidth);
    axes.y.height(gheight);
    var y = 0;
    for (var i = 0; i < rows.length; ++i) {
      var row = rows[i];
      var x = 0;
      var g = canvas_.append('g').attr('class', 'chart')
        .attr('transform', 'translate(' + x + ',' + y + ')');
      axes.y.canvas(g).draw()
      x += ywidth;
      for (var j = 0; j < columns.length; ++j) {
        var column = columns[j];
        var g = canvas_.append('g').attr('class', 'chart')
          .attr('transform', 'translate('+ x + ',' + y + ')');
        this.draw1(nested_data[row][column], g);

        if (i == (rows.length - 1)) {
          var g = canvas_.append('g').attr('class', 'chart')
            .attr('transform', 'translate(' + x + ',' + (y + gheight) + ')');
          axes.x.canvas(g).draw() 
        }
        x += gwidth + padding;
      }
      y += gheight + padding;
    }
  }

  chart.draw1 = function(data, g) {

    var nesting = d3.nest();
    if (selection_.colour !== undefined && selection_.colour.length) {
      nesting.key(function(d) { return d[selection_.colour];})
    } else {
      nesting.key(function() { return 'empty'; });
    }
    nested_data = nesting.map(data);

    var line = d3.svg.line()
      .x(axes.x.transform)
      .y(axes.y.transform);

    g.append('rect').attr('width', axes.x.width())
      .attr('height', axes.y.height()).attr('fill', '#F0F0F0');

    g.selectAll('line.hrule').data(axes.y.ticks).enter().append('line')
      .attr('class','hrule')
      .attr('x1', 0).attr('x2', axes.x.width())
      .attr('y1', axes.y.transform_val).attr('y2', axes.y.transform_val)
      .attr('stroke', '#FFFFFF');
    g.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.transform_val).attr('x2', axes.x.transform_val)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#FFFFFF');

    for (d in nested_data) {
      var colour = axes.colour.transform(nested_data[d][1]);
      g.append("svg:path").attr("d", line(nested_data[d])).attr('stroke', colour).attr('fill', 'none');
    }
    g.selectAll('circle').data(data).enter().append('circle')
      .attr('cx', axes.x.transform)
      .attr('cy', axes.y.transform)
      .attr('r', 2)
      .attr('fill', axes.colour.transform);
    
  }

  return chart;
};

// ============================================================================
// =======                         AXES                                 =======
// ============================================================================

function LinearYAxis() {
  var axis = {};
  
  var variable_;
  var range_  = [undefined, undefined];
  var width_  = 30;
  var height_;
  var canvas_;
  var labels_;
  var label_range_;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, function(d) { return Number(d[variable_]);});
    return(this);
  }

  axis.width = function() {
    return 30;
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

  axis.transform = function(value) {
    return(axis.transform_val(value[variable_]));
  }

  axis.ticks = function() {
    return (labels_);
  }

  axis.draw = function() {
    canvas_.selectAll("line").data(labels_).enter().append("line")
      .attr("x1", width_-5).attr("x2", width_)
      .attr("y1", axis.transform_val).attr("y2", axis.transform_val)
      .attr("stroke", "#000000");
    canvas_.selectAll('text').data(labels_).enter().append('text')
      .attr('x', width_-5).attr('y', axis.transform_val).attr('dy', '0.35em')
      .attr('text-anchor', 'end').text(function(d) { return (d);});
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

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, function(d) { return d[variable_];});
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






function ColourAxis() {
  var axis = {};
  
  var variable_;
  var scale_  = d3.scale.category10();
  var width_  = 0;
  var height_ = 0;
  var canvas_;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.domain = function(data) {
    scale_.domain(d3.map(data, function(d) { return d[variabele_];}));
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

  axis.transform = function(value) {
    if (variable_ === undefined) return ('steelblue');
    return(scale_(value[variable_]));
  }

  axis.draw = function() {
  }


  return axis;
}



function Linechart() {
  var chart = {};

  var data_;
  var selection_;
  var selector_;

  var canvas_;
  var axes = {
    'x' : LinearXAxis(),
    'y' : LinearYAxis(),
    'colour' : ColourAxis()
  };

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
    return (selection.x !== undefined && selection.x.length > 0 &&
      selection.y !== undefined && selection.y.length > 0);
  }

  chart.draw = function() {
    console.log("Drawing line chart");
    var xheight = axes.x.variable(selection_.x).domain(data_).height();
    var ywidth  = axes.y.variable(selection_.y).domain(data_).width()
    var width   = canvas_.attr('width');
    var height  = canvas_.attr('height');
    var gwidth  = width - ywidth;
    var gheight = height - xheight;
    var g = canvas_.append('g').attr('class', 'chart')
      .attr('transform', 'translate(' + ywidth + ',0)');

    // Setting of colour domain should probably occur in draw1, as this has 
    // nothing to do with small multiples. However, we need to calculate the
    // domain using the full data set. Perhaps we can avoid this if we use the
    // levels from the meta information on the data.
    if (selection_.colour !== undefined && selection_.colour.length) {
      axes.colour.variable(selection_.colour).domain(data_);
    }

    var nesting = d3.nest();
    if (selection_.row !== undefined && selection_.row.length) {
      nesting.key(function(d) { return d[selection_.row];})
    } else {
      nesting.key(function() { return 'empty'; });
    }
    if (selection_.column !== undefined && selection_.column.length) {
      nesting.key(function(d) { return d[selection_.column];})
    } else {
      nesting.key(function() { return 'empty'; });
    }
    
    var nested_data = nesting.map(data_);
    var rows     = d3.keys(nested_data);
    var nrow     = d3.keys(nested_data).length;
    var columns  = d3.keys(nested_data[d3.keys(nested_data)[0]]);
    var ncolumn  = d3.keys(nested_data[d3.keys(nested_data)[0]]).length;

    var padding  = 5;
    var gheight = (height - xheight - (nrow-1)*padding) / nrow;
    var gwidth  = (width - ywidth - (ncolumn-1)*padding) / ncolumn;
    axes.x.width(gwidth);
    axes.y.height(gheight);
    var y = 0;
    for (var i = 0; i < rows.length; ++i) {
      var row = rows[i];
      var x = 0;
      var g = canvas_.append('g').attr('class', 'chart')
        .attr('transform', 'translate(' + x + ',' + y + ')');
      axes.y.canvas(g).draw()
      x += ywidth;
      for (var j = 0; j < columns.length; ++j) {
        var column = columns[j];
        var g = canvas_.append('g').attr('class', 'chart')
          .attr('transform', 'translate('+ x + ',' + y + ')');
        this.draw1(nested_data[row][column], g);

        if (i == (rows.length - 1)) {
          var g = canvas_.append('g').attr('class', 'chart')
            .attr('transform', 'translate(' + x + ',' + (y + gheight) + ')');
          axes.x.canvas(g).draw() 
        }
        x += gwidth + padding;
      }
      y += gheight + padding;
    }
  }

  chart.draw1 = function(data, g) {

    var nesting = d3.nest();
    if (selection_.colour !== undefined && selection_.colour.length) {
      nesting.key(function(d) { return d[selection_.colour];})
    } else {
      nesting.key(function() { return 'empty'; });
    }
    nested_data = nesting.map(data);

    var line = d3.svg.line()
      .x(axes.x.transform)
      .y(axes.y.transform);

    g.append('rect').attr('width', axes.x.width())
      .attr('height', axes.y.height()).attr('fill', '#F0F0F0');

    g.selectAll('line.hrule').data(axes.y.ticks).enter().append('line')
      .attr('class','hrule')
      .attr('x1', 0).attr('x2', axes.x.width())
      .attr('y1', axes.y.transform_val).attr('y2', axes.y.transform_val)
      .attr('stroke', '#FFFFFF');
    g.selectAll('line.vrule').data(axes.x.ticks).enter().append('line')
      .attr('class','vrule')
      .attr('x1', axes.x.transform_val).attr('x2', axes.x.transform_val)
      .attr('y1', 0).attr('y2', axes.y.height())
      .attr('stroke', '#FFFFFF');

    for (d in nested_data) {
      var colour = axes.colour.transform(nested_data[d][1]);
      g.append("svg:path").attr("d", line(nested_data[d])).attr('stroke', colour).attr('fill', 'none');
    }
    g.selectAll('circle').data(data).enter().append('circle')
      .attr('cx', axes.x.transform)
      .attr('cy', axes.y.transform)
      .attr('r', 2)
      .attr('fill', axes.colour.transform);
    
  }

  return chart;
};

// ============================================================================
// =======                         AXES                                 =======
// ============================================================================

function LinearYAxis() {
  var axis = {};
  
  var variable_;
  var range_  = [undefined, undefined];
  var width_  = 30;
  var height_;
  var canvas_;
  var labels_;
  var label_range_;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, function(d) { return Number(d[variable_]);});
    return(this);
  }

  axis.width = function() {
    return 30;
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

  axis.transform = function(value) {
    return(axis.transform_val(value[variable_]));
  }

  axis.ticks = function() {
    return (labels_);
  }

  axis.draw = function() {
    canvas_.selectAll("line").data(labels_).enter().append("line")
      .attr("x1", width_-5).attr("x2", width_)
      .attr("y1", axis.transform_val).attr("y2", axis.transform_val)
      .attr("stroke", "#000000");
    canvas_.selectAll('text').data(labels_).enter().append('text')
      .attr('x', width_-5).attr('y', axis.transform_val).attr('dy', '0.35em')
      .attr('text-anchor', 'end').text(function(d) { return (d);});
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

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.domain = function(data) {
    range_ = d3.extent(data, function(d) { return d[variable_];});
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






function ColourAxis() {
  var axis = {};
  
  var variable_;
  var scale_  = d3.scale.category10();
  var width_  = 0;
  var height_ = 0;
  var canvas_;

  axis.variable = function(variable) {
    if (!arguments.length) {
      return variable_;
    } else {
      variable_ = variable;
      return this;
    }
  }

  axis.domain = function(data) {
    scale_.domain(d3.map(data, function(d) { return d[variabele_];}));
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

  axis.transform = function(value) {
    if (variable_ === undefined) return ('steelblue');
    return(scale_(value[variable_]));
  }

  axis.draw = function() {
  }


  return axis;
}




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


