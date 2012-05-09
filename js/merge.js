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

function Table(name, topics, dimensions){
   return { name: name || ""
          , topics: topics || []
          , dimensions: dimensions || []
          , columns: []
          }
}

function Dimension(name, type, categories){
   return { name: name || ""
          , type: type || "categorical"
          , categories: categories || []
          }
}

var d = Dimension("year", [2001,2002]);
console.log(d)

//var t = Table("T1",,[d])   
