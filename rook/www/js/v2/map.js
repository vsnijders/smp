
function Map() {
  
  var chart = Chart({
    axes : {
        'x' : RegionAxis(),
        'y' : ChloroplethAxis()
      },
    required : ['x', 'y']
  });

  chart.draw_data = function(data, g) {
  }


  return axes;
}

// ============================================================================
// =======                         REGION AXIS                          =======
// ============================================================================

function RegionAxis() {
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
  }

  axis.scale = function(region) {
    // Here we should return a polygon for the region.
  }

  axis.transform = function(d) {
    return axis.scale(axis.value(d));
  }

  return axis;
}

// ============================================================================
// =======                         CHLOROPLETH AXIS                     =======
// ============================================================================

function ChloroplethAxis() {
  var axis = Axis();

  return axis;
}


