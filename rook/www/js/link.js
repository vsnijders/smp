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
			$("div.dimension", this).each(function(i){
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
		return link;
	},
	
	render: function(data){
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

