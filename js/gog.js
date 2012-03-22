function Aes(name){

   
   var scale = d3.scale.linear()
     , format
     , value
     , variable 
     , type
     ;
      
   var aes = { name : name || ""
             , scale : scale
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
      scale.range(aes.scale.range());
      
      if (type === "cat"){
         scale = scale.domain(data.map(value));
      } else {
         scale = scale.domain([d3.min(data, value), d3.max(data, value)]);
      }
      
      aes.format = format;
      aes.scale = scale;
      
      return aes;
   }
   
   aes.variable = function( _ , _type) {
      if (!arguments.length){
         return variable;
      }
      variable = _ ;
      type = _type || "cat";
      var rg = scale.range();
      
      if (type === "num"){
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
         value =  stringValue;
      }
      return aes;
   }   
   return aes;
}


var data = [{a:1, b:2}, {a:10, b:20}];

var aes = Aes("x")
  .variable("a", "num")
  .refresh(data);

console.log(aes);