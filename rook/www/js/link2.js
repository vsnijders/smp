var Category = Backbone.Model.extend({
	isLink: function(){
		return this.has("category1") && this.has("category2");
	},
	
	isEmpty: function(){
		return !this.has("category1") && !this.has("category2");
	},

	//splits the category
	splitOf: function(){
		var cat = new Category({category2:this.get("category2")});
		this.unset("category2");
		return cat;   
	}
});

var Categories = Backbone.Collection.extend({
	model: Category,

	unlink: function(at){
		var cat1 = this.at(at);
		var cat2 = new Category({category2:cat1.get("category2")});
		this.add(cat2, {at: at});
		cat1.unset("category2");
	},

	link: function(from, to){
		var catfrom = this.at(from);
		var catto = this.at(to);

		if (catto.has("category1"))
			catto.set("category2", catfrom.get("category2"))
		else 
			catto.set("category1", dimfrom.get("category1"))
		this.remove(dimfrom);
	}
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

		var cats1 = _.filter(cats, function(c){return c.category1});
		var cats2 = _.filter(cats, function(c){return c.category2});
		var dim2 = new Dimension({dimension2:dim.get("dimension2"), categories: cats2});
		this.add(dim2, {at: at});
		dim.unset("dimension2");
		dim.categories.reset(cats1);
	},

	link: function(from, to){
		var dimfrom = this.at(from);
		var dimto = this.at(to);

		dimto.categories.add(dimfrom.categories.toJSON());
		if (dimto.has("dimension1"))
			dimto.set("dimension2", dimfrom.get("dimension2"))
		else 
			dimto.set("dimension1", dimfrom.get("dimension1"))
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

		this.refreshDrop();
		return this;
	},

	getData: function(el){
				var el = $(el);
		
		var link = {};

		link.table1 = $("#table1").text();
		link.table2 = $("#table2").text();
		link.newtable = $("#newtable").val();
		
		var dims = link.dimensions = [];
		
		$("tr.dimension", el).each(function(i){
			var dim = {};
			$("div.dimension", this).each(function(){
				var data = $(this).data();
				dim[data.dim] = data.value;
			});
			dims.push(dim);
		})
		
		$("tr.categories", el).each(function(i, tr){
			var cats = dims[i].categories = [];
			
			$("tr.category", tr).each(function(i){
			    var cat = {};
				$("div.category",this).each(function(){
					var data = $(this).data();
					cat[data.cat] = data.value;
				});
				cats.push(cat);
			});
		});
		return link;
	},

	refreshDrop: function(){
		//select empty nodes and make them droppable
		$("[data-value='']")
			.removeClass("draggable")
			.addClass("droppable")
			;    

        $("div.draggable")
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
	        	var dragged = dragevent.draggable;
    	    	var target = $(this);
	        	
	        	var l = window.l;

	        	var d = dragged.data();
	        	var t = target.data();

	        	//unset?
	        	l.dimensions.link(d.index, t.index);
	        	//l.dimensions.at(d.index).unset(d.dim);
	        	//l.dimensions.at(t.index).set(d.dim, d.value);
	        	lv.render();
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

        	console.log(dragevent, dragged)
        }

        $(".category.droppable")
          .droppable({
            accept: ".category.draggable",
            activeClass: "droppable_active", 
            hoverClass: "droppable_hover", 
            tolerance : "touch",
            drop: catDrop
          });
	}
});

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

		if (dim.isLink()){
			html = this.template(dim.toJSON());
		} else if (dim.has("dimension1")) {
			html = this.template_ul1(dim.toJSON());
		} else if (dim.has("dimension2")){
			html = this.template_ul2(dim.toJSON());
		}
		//$el.html(html);
		$(html).appendTo(par);

		//$el.appendTo(par);
		$("a.unlink", par).on("click", function(){
			var at = $(this).data("index");
			l.dimensions.unlink(at);
			lv.render();
		})
		return this;
	}
});

var CategoryView = Backbone.View.extend({
	render: function(){	
		return this;
	}
});

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
