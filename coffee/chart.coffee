class ChartView extends d3View
	svg: null
	xScale: null
	yScale: null
	colorScale: null
	
	initialize: (parent = "body") ->
		#super(parent)
		@svg = d3.select(parent).append("svg")
		@setElement(@svg.node())
		# set up chart

	render: (dat) ->
		regions = @svg.select("g.regions")
		regions.selectAll("path")
		   .data(features)
		   .enter().append("path").attr("class", if dat then quantize else null)
           .attr("d", path)
           .attr("title", (d) -> d.properties.name)
           #.attr("id", (d)-> d.properties.id)
           #.on("mouseenter", highlight)
		return this

@ChartView = ChartView