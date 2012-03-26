function cross(data, row, col, callback){
   row = row || [];
   col = col || [];
   
   var vars = row.concat(col);
   if (vars.length == 0)
      return {row: "", col: "", data: [[data]]};
	  
   var rowcat = (row.length === 0)? [function(d){return 0;}] : row.map(function(v){return function(d){return d[v]}});
   var colcat = (col.length === 0)? [function(d){return 0;}] : col.map(function(v){return function(d){return d[v]}});
   
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
   return { row: (row.length === 0)? [] : rows
          , col: (col.length === 0)? [] : cols
		    , data: d
          };   
}

function drawchart(data, selection, variables, mapping, type) {
 type = type || "bar";
 
 var graph = $(".graph");
 
 var width = graph.width();
 var height = graph.height();
 
 graph = d3.select(graph[0]);
 
 //clear the graph
 graph.html("");  
 
 var crossed = cross(data, selection.row, selection.column);
 var data = crossed.data;
 
 
 width = (width/data[0].length) - 10;
 height = (height/data.length) - 10;
 
 mapping.width(width);
 mapping.height(height);
    
 var smallmul = graph.append("table").attr("class", "smallmultiple");
	if (crossed.col.length) {
	   var colhead = smallmul.append("tr");
	   crossed.col.forEach(function(d) {colhead.append("th").text(d)});
	}

	for (var r = 0; r < data.length; r++) {
	   var row = smallmul.append("tr");
	   if (crossed.row.length){
		  row.append("th").text(crossed.row[r]);
	   }
	   for (var c = 0; c < data[r].length; c++){
		  var col = row.append("td");
		  var chart = col.append("svg").attr("class", "chart");
		  var ct;
		  if (type === "bar"){
			  var ct = new Barchart;
			  //TODO remove next line, will be taken care by mapping...
			  ct.width(width).height(height).categorical(selection.y[0]).numeric(selection.size[0]);
		  } else if (type === "bubble"){
		      var ct = bubble = new Bubble;
              bubble
			    .width(width)
				.height(height)
				.xvar(selection.x[0])
				.yvar(selection.y[0])
                .sizevar(selection.size[0])
				.colourvar(selection.colour[0]);
		  } else if (type === "line"){
				var ct = linechart = new LineChart;
				linechart
				   .width(width)
				   .height(height)
				   .xvar(selection.x[0])
				   .yvar(selection.y[0])
				   ;
				if (selection.colour != undefined) 
					linechart.colourvar(selection.colour[0]); 
		  } else if (type === "mosaic"){
		      var ct = mosaic = new Mosaic;
			  mosaic.width(width).height(height).xvar(selection.x[0]).yvar(selection.y[0]).vvar(selection.size[0]);
		  }
		  ct.mapping(mapping);
		  ct.plot(chart, data[r][c]);
	   }
	}
}

/*var data = [ {a: "a1", b: "b1"}
           , {a: "a1", b: "b2"}
           , {a: "a4", b: "b1"}
           ];

var vars = ["a", "b"];

var d = cross(data, ["a"], ["b"]);
smallmul(d3.select('.graph2'), d, "line");
console.log(d);
*/
