function Table(name, topics, dimensions){
   var table = {}
     , name = name || ""
     , topics = topics || []
     , dimensions = dimensions || []
     ;
     
   table.topics = function(_){
      return topics;
   }
   
   table.dimensions = function(_){
      return dimensions;
   }
   
   table.name = function(_){
      if (!arguments.length)
         return name;
      name = _;
      return table;
   }
   
   return table;
}

function Dimension(name, categories){
   var name = name || "D"
     , categories = categories || []
     ;
     
   
}

function Merge(tab1, tab2){

   var merge = {};

   merge.dimension = function(d1, d2, name){
      var d = { from1: d1
              , from2: d2
              , name: name || d1.name
              , categories: []
              }
      return d;
   }

   merge.category = function(c1, c2, name){
     var c = { from1: c1
             , from2: c2
             , name :  name || c1.name
             }
     return c;
   }
}