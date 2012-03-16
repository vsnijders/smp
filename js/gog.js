var mapping = 
   { x: null
   , y: null
   , color: null
   , size: null
   , facetX : null
   , facetY : null
   }

var scales = 
   { x: null
   , y: null
   , color: null
   , size: null
   }

function aes(mapping, data){
   
}

function facets(x, y, data){
  var vars = x.concat(y);
  nest = d3.nest();
  for (var i = 0; i < vars.length; i++){
     var p = i;
     var nest = nest.key(function(d) {return d[vars[p]]})
  }
  return nest.entries(data);
}


var data = [{a:1, b:2}, {a:10, b:20}];

var fac = facets(["a"], ["b"], data);

console.log(fac);