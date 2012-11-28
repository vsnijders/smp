function Chart() {
  var chart = {};

  var data_;
  var selection_;
  var values_;

  var canvas_;

  // hack 
  var axes = chart.axes = {
    'x' : LinearXAxis(),
    'y' : LinearYAxis(),
    'colour' : ColourAxis()
  };


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

      values_ = { row: d3.functor("<empty>"),
                  column: d3.functor("<empty>"),
                  colour: d3.functor("steelblue")
                };

      if (selection.row !== undefined && selection.row.length){
        var variable = selection.row[0];
        values_.row = function(d){return d[variable];};
      }

      if (selection.column !== undefined && selection.column.length){
        var variable = selection.column[0];
        values_.column = function(d){return d[variable];};
      }

      // sets value accessors, to be overridden in subclasses
      this.setValues(selection, values_);

      return this;
    }
  }

  chart.setValues = function(selection, values_){
    throw "setValues(selection, values_) needs to be implemented on subclass";
  }

  chart.values = function() {
    return values_;
  }


  //TODO remove, but of overkill
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
    console.log("Drawing chart");

    //initialize axes with data and selection
    var xheight = axes.x.variable(selection_.x).domain(data_).height();
    var ywidth  = axes.y.variable(selection_.y).domain(data_).width()
    
    var width   = canvas_.attr('width');
    var height  = canvas_.attr('height');
    
    var g = canvas_.append('g')
      .attr('class', 'chart')
      .attr('transform', 'translate(' + ywidth + ',0)')
      ;

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
    
    //TODO use meta data in stead of nesting the data itself
    var nested_data = nesting.map(data_);
    var rows     = d3.keys(nested_data);
    var nrow     = rows.length;
    var columns  = d3.keys(nested_data[rows[0]]);
    var ncolumn  = columns.length;

    // can be replaced with d3.scale.ordinal.rangeBands()
    var padding  = 5;
    var gheight = (height - xheight - (nrow-1)*padding) / nrow;
    var gwidth  = (width - ywidth - (ncolumn-1)*padding) / ncolumn;
    axes.x.width(gwidth);
    axes.y.height(gheight);

    var y = 0;
    for (var i = 0; i < rows.length; ++i) {
      var row = rows[i];
      var x = 0;

      // y axis draw
      var g = canvas_.append('g')
                     .attr('class', 'chart')
                     .attr('transform', 'translate(' + x + ',' + y + ')')
                     ;

      axes.y.canvas(g).draw()
      //

      x += ywidth;
      for (var j = 0; j < columns.length; ++j) {
          var column = columns[j];
          var g = canvas_.append('g')
                       .attr('class', 'chart')
                       .attr('transform', 'translate('+ x + ',' + y + ')')
                       ;
          
          this.subdraw(nested_data[row][column], g);

          if (i == (rows.length - 1)) {
            var g = canvas_.append('g')
                           .attr('class', 'chart')
                           .attr('transform', 'translate(' + x + ',' + (y + gheight) + ')')
                           ;
            axes.x.canvas(g).draw() 
        }
        x += gwidth + padding;
      }
      y += gheight + padding;
    }
  }

  return chart;
};