Link = window.Link = {
	getData: function(el){
		var el = $(el);
		
		var link = {};
		
		$("div.table", el).each(function(i, div){
		    link["table"+(i+1)] = $(div).text();
		})
		
		link.newtable = $("#newtable").val();
		
		var dims = link.dimensions = [];
		
		$("tr.dimension", el).each(function(i){
			var dim = {};
			$("span.dim", this).each(function(i){
				dim["dimension"+(i+1)] = $(this).text();
			});
			dims.push(dim);
		})
		
		$("tr.categories", el).each(function(i, tr){
			var cats = dims[i].categories = [];
			
			$("tr.category", tr).each(function(i){
			    var cat = {};
				$("div.category",this).each(function(i){
					cat["category"+(i+1)] = $(this).text();
				});
				cats.push(cat);
			});
		});
		
		console.log(link);
		$("#datalinked").text(JSON.stringify(link));
		return link;
	},
	
	render: function(el,data){
		el = $(el);
		console.log(data);

		$("#newtable", el).val(data.newtable);
		
		$("div.table").each(function(i,div){
			$(div).text(data["table"+(i+1)]);
		});
		
		var tab = el.find("tbody").first();
		
		//skeletons from html
		var _trd = $("tr.dimension", tab);
		var _trc = $("tr.categories", tab);
		var _trcat = $("tr.category", tab);
		
		var dims = data.dimensions;

		tab.html("")
		for (var d in data.dimensions){
			_trd.clone().appendTo(tab);
			_trc.clone()
			   .data("dimension", d)
			   .appendTo(tab)
			   ;
		}

		$("span.dim", tab).each(function(i,div){
			div = $(div);
			var d = dims[i >> 1];
			div.data("value",d);
			div.text(d ? d["dimension"+((i%2)+1)] : "");
		});

		$("a", tab).each(function(i,a){
			$(a).attr("data-target", "#categories_" + i)
			    .on("click", function(){ $("i", this).toggleClass("icon-chevron-down")})
			    ;
		});

		$("tr.categories", tab).each(function(i,tr){
			
			var cats = $("tbody", tr).first();
			cats.html("");

			$("div.collapse", tr).attr("id", "categories_"+i);

			var categories = dims[i].categories;
			for (var c in categories){
				_trcat.clone()
				   .data("value", c)
				   .appendTo(cats)
				   ;
			}

			$("div.category", cats).each(function(j, div){
				div = $(div);
				var d = ((j%2)+1);
				var cattext = categories[j>>1]["category"+ d];
				if (cattext){ 
					div.text(cattext);
				} else {
					div.text(" ")
					   .removeClass("draggable"+d)
					   .addClass("droppable"+d)
					   ;
				}
			});

		});

        $("div.draggable1")
          .css("cursor", "move")
          .draggable( {axis:"y", revert: "invalid"} )
          ;

        $("div.draggable2")
          .css("cursor", "move")
          .draggable( {axis:"y", revert: "invalid"} )
          ;

        $(".dimension.droppable")
          .droppable({
            accept: ".dimension.draggable",
            activeClass: "droppable_active", 
            hoverClass: "droppable_hover", 
            tolerance : "touch",
            drop: function(e, dragevent){
              Link.renderCat(e.target, dragevent.draggable)
            }
          });

        function catDrop(e, dragevent){
        	var dragged = dragevent.draggable;
        	var target = $(this);
        	
        	var stub = target.clone().insertBefore(dragged);

        	dragged.insertBefore(target)
        		   .attr("style", "position:relative")
        	       ;

        	target.insertBefore(stub);
        	stub.remove();

        	// add empty row
        	//dragged.closest("tbody").append(_trcat.clone())
        	
        	console.log(dragevent, dragged)
        }

        $(".category.droppable1")
          .droppable({
            accept: ".category.draggable1",
            activeClass: "droppable_active", 
            hoverClass: "droppable_hover", 
            tolerance : "touch",
            drop: catDrop
          });

        $(".category.droppable2")
          .droppable({
            accept: ".category.draggable2",
            activeClass: "droppable_active", 
            hoverClass: "droppable_hover", 
            tolerance : "touch",
            drop: catDrop
          });

	},
	
	renderCat: function(target, cat){
	}
};

function tree(data) {    
  if (typeof(data) == 'object') {        
	  var ul = $('<ul>');
	  for (var i in data) {            
		  ul.append($('<li>').text(i).append(tree(data[i])));         
	  }        
	  return ul;
  } else {       
	  var textNode = document.createTextNode(' => ' + data);
	  return textNode;
  }
}

