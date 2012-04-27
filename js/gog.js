function Aes(scale, defaultValue){
   var scale = scale || d3.scale.linear()
     , format = String
     , value
     , variable = null
     , type
	  , astype
     , dx = 0
	  , defaultValue = defaultValue || "empty"
	  , axis = d3.svg.axis()
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
      return scale(value(d)) + dx;
   }
   
   function formatValue(d) {
      return format(value(d));
   }

   function labelValue(d) {
      return variable + ": " + format(value(d));
   }
      
   function setScaleType(_type){  
	   _type = _type || type;
	   dx = 0;
      
	   var rg = extent();
      
      if (_type === "numerical"){
         scale = d3.scale.linear().range(rg);
         format = d3.format("n");
         value = numValue;
         
      } else if (_type === "time"){
         scale = d3.time.scale().range(rg);
         format = d3.time.format("%Y");
         value = stringValue;
      } else if (_type === "categorical"){
         scale = d3.scale.ordinal().rangeBands(rg);
         //console.log(scale.rangeBand(), rg);
         //dx = scale.rangeBand() / 2;
         format = String;
         value = stringValue;
      } else {
         scale = d3.scale.ordinal().rangeBands(rg);   
         format = String;
         value = function(d) defaultValue;
	  }
	  extent(rg);
      aes.format = format;
      aes.scale = scale;
	   aes.value = value;
      aes.scaledValue = scaledValue;
      aes.labelValue = labelValue;
      aes.formatValue = formatValue;
      aes.setScaleType = setScaleType;

     return aes;
   }
   
   //extent function that "knows" if it should use rangeExtent or normal range
   function extent(_){
      if (!arguments.length){
	     return (scale.rangeExtent || scale.range)()
	  }
     (scale.rangeBands || scale.range)(_);
     //dx = (scale.rangeBand || d3.functor(0))() /2;
	  return aes;
   }
   
   aes.extent = extent;


   aes.refresh = function(data){
      if (variable === null){
	     return aes;
	  }
      extent(aes.extent());
      
      if (type === "categorical"){
         scale = scale.domain(data.map(value));
      } else if (type === "numerical"){
         scale = scale.domain([d3.min(data, value), d3.max(data, value)]);
      } else if (type === "time"){
         scale = scale.domain([d3.min(data, value), d3.max(data, value)]);
      } else {
         scale = scale.domain(defaultValue);
      }
      
      aes.format = format;
      aes.scale = scale;
	   aes.value = value;
      aes.scaledValue = scaledValue;
      aes.labelValue = labelValue;
      aes.setScaleType = setScaleType;
      return aes;
   }
   
   aes.axis = function(_){
      if (!arguments.length){
         return axis;
      }
	  
      axis = _ ;	  
	  return axis;  
   }
   
   aes.type = function(_){
      if (!arguments.length){
         return type;
      }
      type = _ ;	  
	  return setScaleType(type);
   }
   
   aes.dx = function(_){
      if (!arguments.length){
         return dx;
      }
      
      dx = _ ;
      return aes;
   }
   
   aes.variable = function( _ , _type) {
      if (!arguments.length){
         return variable;
      }
      variable = _ ;
	  
      type = _type || "categorical";
	  
	  return setScaleType(type); 
   }
   
   aes.value = function(d) defaultValue;
   aes.scaledValue = scaledValue;
   
   return aes;
}

function Mapping(sel) {
   var sel  = sel || {};
   var _width = _height = 400;
   
   var _padding = 5;
   var _paddingBottom = 15;
   var _paddingTop = 15;
   var _paddingLeft = 55;
   
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
     rb = (_map.x.scale.rangeBand || d3.functor(0))()/2;
     //console.log("rb", rb);
	  (_map.x.scale.rangeBands || _map.x.scale.range)([0 + (_paddingLeft + rb), _width - _padding]);
	  (_map.size.scale.rangeBands || _map.size.scale.range)([0 + _paddingLeft, _width - _padding]);
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
	  (_map.y.scale.rangeBands || _map.y.scale.range)([_height - _paddingBottom, 0 + _paddingTop]);
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
	  .map(function(v) "<tr><th>" + v.value.variable() + ": </th><td>" + _map[v.key].formatValue(d) + "</td></tr>")
	  ;
	 return "<table class='label'>" + s.join("") + "</table>";
   }
   
   return mapping;
}

function totimeiftime(v, data){
   var variable = v.variable();
   if (variable === "year"){
     data.forEach(function(d){d.year = new Date(d.year);});
     v.type("time");
     v.refresh(data);
     //console.log(data)   
   } else if (variable === "quarter"){
       var qre = /(\d{4})-(\d)/
       data.forEach(function(d){
         qu = d.quarter.match(qre);
         d.quarter = new Date(qu[1], 1 + (3 * (+qu[2])), 15)
       });
       v.type("time");
       v.refresh(data);
       //console.log(data);
   }
   return v;
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
