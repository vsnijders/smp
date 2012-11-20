class BarChart
	@dim: 
		size: {type:"numeric", optional: false},
		y: {type:"categorical", optional: false},
		color: {type: "categorical", optional: true}
	
	constructor: (@width=480, @height=640) ->	
		@map = {size: null, y: null}
		@margin = {top:0, left:0, right:0, bottom: 0}

	isValid: ->
		@map.y? and @map.size?

	y: (_) -> 
		@map.y = _
		@

	size: (_) -> 
		@map.size = _
		@

	mapDim: (variable, dim) ->
		type = @dim[dim].type
		# check type
		@map[dim] = variable
		return @

	plotAxis: (el, scale) ->
    	return @

    plotGrid: (el) ->
    	return @

	plot: (el, data) ->
		$svg = $("svg", el)
			.attr("width", @width)
			.attr("height", @height)
		
		svg = d3.select($svg.get(0))

		# to clean up javascript code
		map = @map
		size = @_size
		y = @_y
		color = @_color

		bars = svg.selectAll("rect").data(data)
		console.log(y.rangeBand())
		bars.enter()
			.append("rect")
			.attr
				x: (d) -> Math.min(size(0), size(d[map.size]))
				y: (d) -> y(d[map.y])
				width: (d) -> Math.abs(size(0)-size(d[map.size]))
				height: y.rangeBand()
				fill: color
				stroke: "white"
				"class": "bar"
				
		console.log(bars)

		bars.exit().remove()

		#highlight

		# add tipsy

		return @

	rescale: (data) ->
		map = @map
		size_ext = d3.extent(data, (d) -> +d[map.size])
		
		size_ext[0] = 0 if size_ext[0] > 0
		size_ext[1] = 0 if size_ext[1] < 0

		@_size = d3.scale.linear()
		   .domain(size_ext)
		   .range([@margin.left, @width - @margin.right])

		@_y = d3.scale.ordinal()
		   .domain(data.map((d) -> d[map.y]))
		   .rangeBands([@margin.top, @height - @margin.bottom])

		if map.color?
			@_color = d3.scale.category20()
			           .domain(data.map((d) -> d[map.color]))
		else @_color = d3.functor("steelblue")
		return @

data = [{y: "a", size: 10}, {y: "b", size: 20}]
@bc = {}

$ ->
	window.bc = new BarChart()
	   .y("y")
	   .size("size")
	   .rescale(data)
	   .plot($(".graph"), data)
