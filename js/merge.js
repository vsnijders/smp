function Merge(tab1, tab2){
   var tab1 = tab1;
   var tab2 = tab2;
   
   var merge = { dims: {}
               , topics: {}
               , tabs: [tab1,tab2]
               }
               ;

   mergedimension = function(d1, d2, name){
      var d = { from: [d1.name,d2.name]
              , name: name || d1.name
              , categories: mergecategories(d1,d2)
              , include: true
              }
      merge.dims[d.name] = d;
      return merge;
   }
   
   function mergecategories(d1, d2){
      var cats1 = d1.categories;
      var cats2 = d2.categories;
      
      var cats = cats1.map(function(c){
         var i = cats2.indexOf(c);
         return { name: c
                , from: [c, (i > -1)? cats2[i] : null]
                , include: (i > -1)
                };
      });

      cats2 = cats2.filter(function(c){return cats1.indexOf(c) == -1;});
      cats = cats.concat(cats2.map(function(c){ 
         return { name: c
                , from: [null, c]
                , include: false
                };
      }));
      return cats;      
   }

   merge.mergecategory = function(dim, c0, c1, c2, name){
     //TODO remove old mapping
     c0.from = [c1,c2];
     c0.name = name || c1;
     c0.include = true;
     
     return merge;
   }
   
   merge.mergedimension = mergedimension;
   
   /*
   merge.splitcategory = fuction(dim, c){
      var i = indexOf(dim.categories.indexOf(c));
      if (i > -1){
         var from = dim.categories[i].from;
         dim.categories.splice(i, 1, {from: [from[0], null], name: from[0]}
                                   , {from: [null, from[1]], name: from[1]}
                              );
      }
   }
   */
  
   function initialize(){
       for (var i = 0; i < tab1.dimensions.length; i++){
          var d1 = tab1.dimensions[i];
          for (var j = 0; j < tab2.dimensions.length; j++){
            var d2 = tab2.dimensions[j];
            if (d1.name == d2.name){
               mergedimension(d1,d2);
            }
         }
       }
   }
   
   
   initialize();
   return merge;
}

function Table(name, topics, dimensions){
   return { name: name || ""
          , topics: topics || []
          , dimensions: dimensions || []
          , columns: []
          }
}

function Dimension(name, categories, type){
   return { name: name || ""
          , categories: categories || []
          , type: type || "categorical"
          }
}