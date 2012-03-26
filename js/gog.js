function Aes(scale){
   var scale = scale || d3.scale.linear()
     , format = String
     , value
     , variable = null
     , type
	 , astype
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
      return new Date(d[variable]);
   };
   
   function scaledValue(d) {
      return scale(value(d));
   }
   
   function labelValue(d) {
      return variable + ": " + format(value(d));
   }
   
   function setScaleType(_type){  
	  _type = _type || type;
	  
	  var rg = scale.range();
      
      if (_type === "numerical"){
         scale = d3.scale.linear().range(rg);
         format = d3.format("n");
         value = numValue;
         
      } else if (_type === "time"){
         scale = d3.time.scale().range(rg);
         format = d3.time.format("%Y");
         value = dateValue;
      } else {
         scale = d3.scale.ordinal().rangePoints(rg);   
         format = String;
         value = stringValue;
      }
      return aes;      
   }

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
      aes.scaledValue = scaledValue;
      aes.labelValue = labelValue;
      aes.setScaleType = setScaleType;  
      return aes;
   }
   
   aes.type = function(_){
      if (!arguments.length){
         return type;
      }
      type = _ ;	  
	  return setScaleType(type);	  
   }
   
   aes.variable = function( _ , _type) {
      if (!arguments.length){
         return variable;
      }
      variable = _ ;
	  
      type = _type || "categorical";
	  
	  return setScaleType(type); 
   }   
   return aes;
}

function Mapping(sel) {
   var sel  = sel || {};
   var _width = _height = 400;
   
   var _padding = 5;
   var _paddingBottom = 15;
   var _paddingTop = 15;
   var _paddingLeft = 25;
   
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
	  (_map.x.scale.rangePoints || _map.x.scale.range)([0 + _paddingLeft, _width - _padding]);
	  (_map.size.scale.rangePoints || _map.size.scale.range)([0 + _paddingLeft, _width - _padding]);
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
	  (_map.y.scale.rangePoints || _map.y.scale.range)([_height - _paddingBottom, 0 + _paddingTop]);
	  return mapping;
   }
   
   mapping.map = function(){
     return _map;
   }
   
   mapping.mapped = function(){
     var mapped = d3.entries(_map)
	    .filter(function(v) v.value.variable() !== null)
	    .map(function(v) v.key)
		;
	 var m = {};
	 mapped.forEach(function (v) {m[v] = _map[v].variable();})
	 return m;
   }
   
   mapping.resetVariables = function(){
      d3.values(_map).forEach(function(a){a.variable(null);});
   }
   
   mapping.toLabel = function(d){
   var s = d3.entries(_map)
   	  .filter(function(v) v.value.variable() !== null)
	  .map(function(v) { return _map[v.key].labelValue(d)})
	  ;
	 return s.join(", ");
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
