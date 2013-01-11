var Category = Backbone.Model.extend({
});

var Categories = Backbone.Collection.extend({
	model: Category
});

var Dimension = Backbone.Model.extend({
	
	isLink: function(){
		return this.has("dimension1") && 
			   this.has("dimension2");
	},
	
	isEmpty: function(){
		return !this.has("dimension1") && 
			   !this.has("dimension2");
	},

	initialize: function(init){
		init = init || {};
		this.categories = new Categories(init.categories);
	},

	toJSON: function(){
		return _.extend(this.attributes, {categories: this.categories.toJSON()})
	}
});

var Dimensions = Backbone.Collection.extend({
	model: Dimension,

	unlink: function(at){
		var dim = this.at(at);
		var cats = dim.categories.toJSON();

		var cats1 =  _.filter(cats, function(c){return c.category1})
		              .map( function(c){return _.pick(c, "category1", "category1_name")})
		              ;
		var cats2 = _.filter(cats, function(c){return c.category2})
		             .map( function(c){return _.pick(c, "category2", "category2_name")})
		              ;

//		console.log("cats1", cats1);
//		console.log("cats2" ,cats2);
		var dim2 = new Dimension({
			dimension2:dim.get("dimension2"),
			dimension2_name:dim.get("dimension2_name"), 
			categories: cats2
		});
		this.add(dim2, {at: at+1});
		dim.unset("dimension2");
		dim.unset("dimension2_name");
		dim.categories.reset(cats1);
	},

	link: function(from, to){
		var dimto = this.at(to);
		var to_dim1 = dimto.has("dimension1");

		var dimfrom = this.at(from);

		if (dimfrom.isLink()){
			this.unlink(from);
			from = (to_dim1)? from + 1 :  from
			dimfrom = this.at(from);
		}

		dimto.categories.add(dimfrom.categories.toJSON());
		if (dimto.has("dimension1")){
			dimto.set("dimension2", dimfrom.get("dimension2"))
			dimto.set("dimension2_name", dimfrom.get("dimension2_name"))
		}
		else {
			dimto.set("dimension1", dimfrom.get("dimension1"))
			dimto.set("dimension1_name", dimfrom.get("dimension1_name"))
		}
		this.remove(dimfrom);
	}
});

var Link = Backbone.Model.extend({

	defaults: {
		table1: '',
		table2: '',
		newtable: 'newtable'
	},

	initialize: function(init){
		init = init || {};
		this.dimensions = new Dimensions(init.dimensions);
	},

	toJSON: function(){
		return _.extend(this.attributes, {dimensions: this.dimensions.toJSON()})
	}
});

var LinkView = Backbone.View.extend({
	render: function(){
		
		$("#newtable").val(this.model.get("newtable"));
		$("#table1").text(this.model.get("table1"));
		$("#table2").text(this.model.get("table2"));

		var $tbody = $("tbody");
		$tbody.html("");
	
		this.views = this.model.dimensions.map( function(d, i){
			d.set("i", i);
			var view = new DimensionView({model:d});
			view.render($tbody);
		});

		this.refreshDrop($tbody);
		return this;
	},

	getData: function(el){
		var el = $(el);
		
		var link = {};

		link.table1 = $("#table1").text();
		link.table2 = $("#table2").text();
		link.newtable = $("#newtable").val();
		
		var dims = link.dimensions = [];
		
		$("tr.dimension").each(function(i){
			var dim = {};
			$("div.dimension", this).each(function(){
				var data = $(this).data();
				if (data.value != "") {
					dim[data.dim] = data.value
					dim[data.dim + "_name"] = $("span.dim",this).text();
				};
			});
			dims.push(dim);
		})
		
		//console.log(dims);

		$("tr.categories").each(function(i, tr){
			var cats = dims[i].categories = [];
			
			$("tr.category", tr).each(function(){
			    var cat = {};
				$("div.category",this).each(function(){
					var data = $(this).data();
					cat[data.cat] = data.value;
					cat[data.cat + "_name"] = $(this).text();
				});

				cat.include = $("input.include", this).get(0).checked;
				cats.push(cat);
			});

			var select = $("select.categories", tr);

			if (select.length){
				$("option.category", select).each(function(){
					var cat = {};
					var data = $(this).data();
					cat[data.cat] = $(this).val();
					cat[data.cat + "_name"] = $(this).text();
					cat.include = $(this).val() == select.val();
					cats.push(cat)
				});
			}
		});
		console.log(link);
		return link;
	},

	refreshDrop: function(tbody){

		var _linkview = this;

		//select empty nodes and make them droppable
		$("[data-value='']")
			.removeClass("draggable")
			.addClass("droppable")
			;    

        $("div.draggable")
          .css("cursor", "move")
          .draggable( {axis:"y", revert: "invalid"} )
          ;

    	cleanCats();

        $(".dimension.droppable")
          .droppable({
            accept: function(target){return $(target).hasClass("dimension");},
            activeClass: "droppable_active", 
            hoverClass: "droppable_hover", 
            tolerance : "touch",
            drop: function(e, dragevent){
	        	var dragged = dragevent.draggable;
    	    	var target = $(this);
	        	
	        	var l = window.l;

	        	var d = dragged.data();
	        	var t = target.data();

	        	//nasty!!!!
	        	var link = _linkview.model = new Link(_linkview.getData("#link"));


	        	link.dimensions.link(d.index, t.index);

	        	// should be triggered by previous statement
	        	_linkview.render();
	        	clearResult();
	        		//unset?
	        	//l.dimensions.link(d.index, t.index);
	        	//l.dimensions.at(d.index).unset(d.dim);
	        	//l.dimensions.at(t.index).set(d.dim, d.value);
	        	//lv.render();
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

        	var tr = dragged.closest("tr.category");

        	$("input.include", tr).attr("checked", true);
        	cleanCats();
        }

        $(".category.droppable")
          .droppable({
            accept: function(drop){ return (drop.attr("data-cat") == $(this).attr("data-cat"));},
            activeClass: "droppable_active", 
            hoverClass: "droppable_hover", 
            tolerance : "touch",
            drop: catDrop
          });
	}
});

function cleanCats(){
	// remove empty rows and show linked cats.
	$("tr.category").each(function(i,tr){
		   var linked = $("div.draggable", tr).length == 2;
		   $("a.unlinkcat", this).toggle(linked);
	    })
	   .filter( function(i){ return $("div.droppable", this).length==2})
	   .remove();        	
	clearResult();
}

var DimensionView = Backbone.View.extend({

	initialize: function(){
		this.template = _.template($("#dimview_linked").html());
		this.template_ul1 = _.template($("#dimview_unlinked1").html());
		this.template_ul2 = _.template($("#dimview_unlinked2").html());
	},

	render: function(par){
		var $el = $(this.el);
		var dim = this.model;

		var html = "";
		//console.log(dim.toJSON());
		if (dim.isLink()){
			html = this.template(dim.toJSON());
		} else if (dim.has("dimension1")) {
			html = this.template_ul1(dim.toJSON());
		} else if (dim.has("dimension2")){
			html = this.template_ul2(dim.toJSON());
		}
		//$el.html(html);
		var $html = $(html);
		$html.appendTo(par);

		//$el.appendTo(par);
		$("a.unlinkdim", $html)
		  .on("click", function(){
			var at = $(this).data("index");

			//ugly!!! replace with event or view!
			l.dimensions.unlink(at);
			lv.render();
		  })
		  .on("hover", function(){
		  	$("i", this)
		  	  .toggleClass("icon-resize-horizontal")
		  	  .toggleClass("icon-remove")
		  	  ;
		   })

		$("a.unlinkcat", $html).on("click", function(a){
			var tr = $(this).closest("tr.category");

            // remove check
			$("input", tr).attr("checked", false);
			
			var tr2 = tr.clone();
			tr.after(tr2);

			$("div.category", tr).eq(1)
			   .removeClass("draggable")
			   .addClass("droppable")
			   .attr("data-value", "")
			   .html("")
			   ;

			$("div.category", tr2).eq(0)
			   .removeClass("draggable")
			   .addClass("droppable")
			   .attr("data-value", "")
			   .html("")
			   ;

            //HACK
			lv.refreshDrop();
			/*var dim = l.dimensions.at(dimidx);
			dim.categories.unlink(catidx);
			console.log(dim.toJSON());
			lv.render();
			*/

		  })
		  .on("hover", function(){
		  	$("i", this)
		  	  .toggleClass("icon-resize-horizontal")
		  	  .toggleClass("icon-remove")
		  	  ;
		   })
;

		//this.renderCats(par.get(0), dim.toJSON());

		return this;
	}, 

	renderCats: function(par, dim){
		var par = d3.select(par);
		var tbody = par.append("tr").attr("class", "categories")
		   .append("div")
		   .append("table")
		   .append("tbody")
		   ;
		
		var cats = tbody.selectAll("tr.category").data(dim.categories);
		cats.enter().append("tr")
		   .attr("class", "category")
		   .each(function(d,i){
		   	   var tr = d3.select(this);

		   	   tr.append("td")
		   	     .append("div")
		   	   	 .attr({"data-value": d.category1, 
		   	   	 	    "data-cat": "category1",
		   	   	 	    "class" : "category " + ((d.category1)? "draggable" : "droppable")
		   	   	 	   })
		   	   	 .text(d.category1);

		   	   var td2 = tr.append("td")
		   	   if (d.category1  && d.category2){
			   	   td2.append("a").attr("class", "unlinkcat")
			   	     .append("i")
			   	     .attr({"class": "icon-resize-horizontal"})
			   	     ;
		   	   }

		   	   tr.append("td")
		   	     .append("div")
		   	   	 .attr({"data-value": d.category2, 
		   	   	 	    "data-cat": "category2",
		   	   	 	    "class" : "category " + ((d.category2)? "draggable" : "droppable")
		   	   	 	   })
		   	   	 .text(d.category2);

		   })
		   ;

		cats.exit().remove();
	}
});


function clearResult(){
	$("#linkresult")
	  .html("")
	  .removeClass("text-success text-error")
	.parent().hide();

	$("#create").removeClass("btn-success btn-warning")
}
/*
var link = 
      { table1: "slachtoffer",
        table2: "crimi",
        newtable: "test",
        dimensions:
           [ {dimension1:"Jaar", dimension2:"Jaar"
           , categories: [{category1: "2001", category2: "2001"}, {category1: "2002", category2: "2002"}]}
           ,{dimension1:"Regio", dimension2:"Regio"
           , categories: [{category1: "Amsterdam", category2: "Amsterdam"},{category1: "Rotterdam"}]}
           , {dimension1:"Delict", categories: [{category1: 'Totaal'}, {category1: 'Vermogensmisdrijf'}]}
           ]
       };

$(function(){
	//console.log(link);
	var l = new Link(link);
	l.dimensions.unlink(1);
	console.log(l.toJSON())
	window.l = l;
	window.lv = new LinkView({model:l});
	lv.render();
})
*/