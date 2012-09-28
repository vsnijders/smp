class d3View extends Backbone.View
	margin: {top:10, bottom:10, left:10, right: 10}

	width = (w) ->
		return @$el.width() if not w
		@$el.width(w)
		return this

	height = (h) ->
		return @$el.height() if not h
		@$el.height(h)
		return this
