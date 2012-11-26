
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


