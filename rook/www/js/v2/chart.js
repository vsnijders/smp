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

    var margin = { top : 0, 
                   left : axes.y.width(),
                   right : 0,
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
      var g = canvas_.append('g')
                     .attr('class', 'axis y')
                     .attr('transform', 'translate(' + 0 + ',' + y_cell(row) + ')')
                     ;
      axes.y.canvas(g).draw()
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