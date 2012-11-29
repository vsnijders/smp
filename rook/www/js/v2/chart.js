function Chart(options) {
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
                     .attr('class', 'axis y')
                     .attr('transform', 'translate(' + x + ',' + y + ')')
                     ;

      axes.y.canvas(g).draw()
      //

      x += ywidth;
      for (var j = 0; j < columns.length; ++j) {
          var column = columns[j];
          var g = canvas_.append('g')
                       .attr('class', 'data')
                       .attr('transform', 'translate('+ x + ',' + y + ')')
                       ;
          
          this.draw_data(nested_data[row][column], g);

          if (i == (rows.length - 1)) {
            var g = canvas_.append('g')
                           .attr('class', 'axis x')
                           .attr('transform', 'translate(' + x + ',' + (y + gheight) + ')')
                           ;
            axes.x.canvas(g).draw() 
        }
        x += gwidth + padding;
      }
      y += gheight + padding;
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