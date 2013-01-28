
function Map() {
  
  var chart = Chart({
    axes : {
        'x' : RegionAxis(),
        'y' : ChloroplethAxis(),
        'colour' : ColourAxis() // this is not needed, but the code generates errors otherwise
      },
    required : ['x', 'y']
  });

  chart.draw_data = function(data, g) {
    // - map
    var xmin   =  13565.596;
    var xmax   = 306846.900;
    var ymin   = 277992.603;
    var ymax   = 619305.599;

    console.log(chart.axes.x.bounds())
    // ogrinfo -al -geom=SUMMARY file.shp
    //extent: (13565.596851, 306846.900000) - (277992.603149, 619305.598716)
    

    chart.axes.x.canvas_width(chart.axes.x.width());
    chart.axes.x.canvas_height(chart.axes.y.height());

    var height = chart.axes.x.canvas_height();
    var scale  = height/(ymax - ymin);
    var width  = Math.ceil(height*(xmax - xmin)/(ymax - ymin));

    projection = function(coordinates) {
      return [
          Math.round(scale*(coordinates[0]-xmin)), 
          Math.round(height-scale*(coordinates[1]-ymin)), 
        ];
    }
    var path = d3.geo.path().projection(projection);
    g.selectAll("path").data(data).enter().append("path")
      .attr("d", function(d) {
          var feature = chart.axes.x.transform(d);
          return path(feature);
        })
      .attr("fill", "red")
      .attr("stroke-width", "1")
      .attr("stroke", "black");

  }


  return chart;
}

// ============================================================================
// =======                         REGION AXIS                          =======
// ============================================================================

function RegionAxis() {
  var axis = Axis().title('');

  var map_loaded_;
  var map_;

  // Axis width
  var width_ = 0;
  axis.width = function(width) {
    if (!arguments.length || width == undefined) {
      return width_;
    } else {
      width_ = width;
      return this;
    }
  }

  // Axis height
  var height_ = 0;
  axis.height = function(height) {
    if (!arguments.length || height == undefined) {
      return height_;
    } else {
      height_ = height;
      return this;
    }
  }

  // Canvas height and width
  // In order to translate the polygons of the map the coordinates on the
  // canvas we also need the width and height of the canvas. This is not equal
  // to the width and height of the axis. The axis itself is in this case not 
  // drawn and can therefore have a width of height of zero.
  var canvas_width_;
  var canvas_height_;
  axis.canvas_height = function(canvas_height) {
    if (!arguments.length || canvas_height == undefined) {
      return canvas_height_;
    } else {
      canvas_height_ = canvas_height;
      return this;
    }
  }
  axis.canvas_width = function(canvas_width) {
    if (!arguments.length || canvas_width == undefined) {
      return canvas_width_;
    } else {
      canvas_width_ = canvas_width;
      return this;
    }
  }

  // Set the domain
  axis.domain = function(data) {
    // Here we should load the actual map depending on the type of region which
    // we can obtain from the variable meta. Furthermore, we can also check if
    // all regions are present. Of not, we can also zoom in on the selected 
    // regions. 

    // For now load police regions map
    var map_name = "maps/police_regions/po_2012_simplified.json";
    if (map_loaded_ != map_name) {
      d3.json(map_name, function(json) {
          map_loaded_ = map_name;
          map_ = json;
        });
    }
  }

  axis.bounds = function(){
    if (map_) {
      return d3.geo.bounds(map_.features);
    }
  }

  axis.map = function(){
    return map_;
  }

  var i = 0; //TEST
  axis.scale = function(region) {
    // Here we should return a polygon for the region.

    // For some reason the region names are missing in the police regions map
    // To test: return a random region
    if (map_) {
      i = (i + 1) % map_.features.length
      return map_.features[i];
    }
    return undefined;
  }

  axis.transform = function(d) {
    return axis.scale(axis.value(d));
  }

  axis.draw_first = function() { return this;}
  axis.draw_labels = function() { return this;}
  axis.title = function() { return '';}

  axis.draw = function() {
    // Draw nothing
  }

  return axis;
}

// ============================================================================
// =======                         CHLOROPLETH AXIS                     =======
// ============================================================================

function ChloroplethAxis() {
  var axis = Axis().title('');

  // Axis width
  var width_ = 0;
  axis.width = function(width) {
    if (!arguments.length || width == undefined) {
      return width_;
    } else {
      width_ = width;
      return this;
    }
  }

  // Axis height
  var height_ = 0;
  axis.height = function(height) {
    if (!arguments.length || height == undefined) {
      return height_;
    } else {
      height_ = height;
      return this;
    }
  }

  // Set the domain
  axis.domain = function(data) {
  }

  axis.scale = function(region) {
  }

  axis.transform = function(d) {
    return axis.scale(axis.value(d));
  }

  axis.draw_first = function() { return this;}
  axis.draw_labels = function() { return this;}
  axis.title = function() { return '';}

  axis.draw = function() {
    // Draw nothing
  }

  return axis;
}

