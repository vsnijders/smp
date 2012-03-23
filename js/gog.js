function Aes(scale){
   var scale = scale || d3.scale.linear()
     , format = String
     , value
     , variable = null
     , type
     ;
      
   var aes = { scale : scale
             , format: format
             };
             
   function stringValue(d) {
      return d[variable];
   };
      
   function numValue(d) {
      return +d[variable];
   };

   
   function dateValue(d) {
      return format.parse(d[variable]);
   };

   aes.refresh = function(data){
      if (variable === null){
	     return aes;
	  }
      scale.range(aes.scale.range());
      
      if (type === "categorical"){
         scale = scale.domain(data.map(value));
      } else {
         scale = scale.domain([d3.min(data, value), d3.max(data, value)]);
      }
      
      aes.format = format;
      aes.scale = scale;
	  aes.value = value;
      
      return aes;
   }
   
   aes.variable = function( _ , _type) {
      if (!arguments.length){
         return variable;
      }
      variable = _ ;
	  
      type = _type || "categorical";
      var rg = scale.range();
      
      if (type === "numerical"){
         scale = d3.scale.linear().range(rg);
         format = d3.format("n");
         value = numValue;
         
      } else if (type === "time"){
         scale = d3.scale.linear().range(rg);
         format = d3.time.format("Y");
         value = dateValue;
      } else {
         scale = d3.scale.ordinal().range(rg);   
         format = String;
         value = stringValue;
      }
      return aes;
   }   
   return aes;
}

function Mapping(sel) {
   var sel  = sel || {};
   var _width = _height = 400;
   
   var _padding = 5;
   
   var _map = {
	  x : Aes(d3.scale.linear()),
	  y : Aes(d3.scale.linear()),
	  colour : Aes(d3.scale.category20()),
	  size : Aes(d3.scale.linear()),
      row : Aes(d3.scale.ordinal()),
      column : Aes(d3.scale.ordinal())
   };
   
   var mapping = {};
   
   mapping.width = function(_){
      if (!arguments.length){
	     return _width;
	  }  
	  _width = _;
	  _map.x.scale.range([0 + _padding, _width - _padding]);
	  _map.size.scale.range([0 + _padding, _width - _padding]);
	  return mapping;
   }
   
   mapping.refresh = function(data){
      d3.values(_map).forEach(function(a){a.refresh(data)});
	  return mapping;
   }
   
   mapping.height = function(_){
      if (!arguments.length){
	     return _height;
	  }  
	  _height = _;
	  _map.y.scale.range([0 + _padding,_height - _padding]);
	  return mapping;
   }
   
   mapping.map = function(){
     return _map;
   }
   
   mapping.mapped = function(){
     var mapped = d3.entries(_map)
	    .filter(function(v) v.value.variable() !== null)
	    .map(function (v) v.key)
		;
	 var m = {};
	 mapped.forEach(function (v) {m[v] = _map[v].variable();})
	 return m;
   }
   
   return mapping;
}
/*
var data = [{a:1, b:2}, {a:10, b:20}];

var aes = Aes()
  .variable("a", "num")
  .refresh(data);


var mapping = Mapping();
var map = mapping.map();

map.x.variable("a");
map.size.variable("b");
console.log(map);

d3.values(map).forEach(function(a){a.refresh(data)});
console.log(mapping);
*/