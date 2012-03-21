function cross(data, row, col, callback){
   row = row || [];
   col = col || [];
   
   var vars = row.concat(col);
   if (vars.length == 0)
      return {row: "", col: "", data: [[data]]};
	  
   var rowcat = row.map(function(v){return function(d){return d[v]}});
   var colcat = col.map(function(v){return function(d){return d[v]}});
   
   var rows = d3.keys(d3.nest().key(rowcat[0]).map(data));
   var cols = d3.keys(d3.nest().key(colcat[0]).map(data));
   
   var cross = d3.nest()
      .key(rowcat[0])
      .key(colcat[0])
	  .map(data)
	  ;
   
   var d = rows.map(function(r){
      return cols.map( function(c){
	     var rcdata = cross[r][c] || [];
		 return rcdata;
	  });
   });
   //console.log("cross", cross);
   //console.log("d", d);
   return { row: rows
          , col: cols
		    , data: d
          };   
}

function smallmul(chart, crosseddata, charttype){
  var row = crosseddata.row;
  var col = crosseddata.col;
  var data = crosseddata.data;
  
  var table = chart.append("table");
  table.selectAll("tr").data(data)
     .enter()
	 .append("tr")
	 .selectAll("td").data(data)
	   .enter()
	   .append("td")
	   .append("svg")
	   .text(LineChart(this, data));
}

var data = [ {a: "a1", b: "b1"}
           , {a: "a1", b: "b2"}
           , {a: "a4", b: "b1"}
           ];

var vars = ["a", "b"];

var d = cross(data, ["a"], ["b"]);
smallmul(d3.select('.graph2'), d, "line");
console.log(d);