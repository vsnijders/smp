
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


