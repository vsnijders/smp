function Indexer(prop){
   
   var Indexer = {};
   
   var size = 0;
   var map = {};

   Indexer.indexer = function(o){
      return map[o[prop]] = map[o[prop]] || size++
   }
   
   Indexer.index = function(data){
      return data.map(indexer);
   }
      
   Indexer.map = function(o){
      if (!arguments.length) 
         return map;
      
      return map[o[prop]];
   }
   
   Indexer.size = function() {
      return size;
   }
   
   return Indexer;
}

function MultiIndexer(props){
   
   var MultiIndexer = {};
   
   var props = props;
   var maps = props.map(function(p){return {}});
   var sizes = props.map(function(p) {return 0});
   
   MultiIndexer.indexer = function(o){
      var idx = [];
      for (var i=0; i < props.length; i++){
         return maps[i][o[props[i]]] = maps[i][o[props[i]]] || sizes[i]++      
      }
      return idx;
   }
   
   MultiIndexer.index = function(data){
      return data.map(indexer);
   }
      
   MultiIndexer.map = function(){
      return map;
   }
   
   MultiIndexer.size = function() {
      return size;
   }
   
   return MultiIndexer;
}

function cross(data, row, column, callback){
   row = row || [];
   column = column || [];
   
   rowidx = row.map(Indexer);
   colidx = column.map(Indexer);
   
   var vars = row.concat(column);
   
}

var data = [ {a: 1, b: 2}
           , {a: 4, b: 1}
           ];
           
var idx = Indexer("a");