class BarChart
	@dim: 
		size: {type:"numeric", optional: false},
		y: {type:"categorical", optional: false}

	constructor: (@width=480, @height=640) ->	
		@map = {size: null, y: null}
		@margin = {top:0, left:0, right:0, bottom: 0}

	a = () ->
		null

	map: (variables, dims) ->
		@map
		return @

	plotAxis: (el, scale) ->
    	return @

    plotGrid: (el) ->
    	return @

	plot: (el, data) ->
		$svg = $("svg", el)
			.attr("width", @width)
			.attr("height", @height)

		svg = d3.select($svg.first())
		# to clean up javascript code
		size = @size
		y = @y
		map = @map

		bars = svg.selectAll("rect").data(data)

		bars.enter()
			.append("rect")
			.attr( class: "bar",
			       x: (d) -> Math.min size(0), size(d[map.size]),
			       y: (d) -> @y d[map.y],
			       width: (d) -> Math.abs size(0), size(d[map.size]),
			       height: y.rangeBand(),
			       fill: "steelblue",
			       stroke: "white"
				 )

		bars.exit().remove()

		#highlight

		# add tipsy
		

		return @

	rescale: (data) ->
		size_ext = d3.extent(data, (d) -> +d[@map.size])
		size_ext[0] = 0 if size_ext > 0
		size_ext[1] = 0 if size_ext < 0

		@size = d3.scale.linear()
		   .domain(size_ext)
		   .range([@margin.left, width - @margin.right])

		@y = d3.scale.ordinal()
		   .domain(data.map( (d)-> d[@map.y]))
		   .range([height - @margin.bottom, @margin.top])
		
		return @

	isValid: (selection) ->