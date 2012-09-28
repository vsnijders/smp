class Variable
	constructor: (@code, @name, @type="numerical") ->

class Aes
	constructor: () ->

	scale: d3.scale.linear()
	format: d3.format("n")
	
	value: (d) => +d[@variable.code]

	refresh: (data) ->
		range = d3.extent(data, value)
		range

@Variable = Variable