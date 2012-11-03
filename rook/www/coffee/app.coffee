@StatMine = class StatMine extends Batman.App
  @root "app#index"

Table = class StatMine.Table extends Batman.Model
  @encode "name"
  @resourceName: "table"
  @persist Batman.RestStorage
  @url = "/custom/statmine/tables"
  url: -> "./tables?name=#{@get('name')}"
  @accessor "Url", -> @url()

AppController = class StatMine.AppController extends Batman.Controller
  routingKey: 'app'

  check: (n, e) ->
  	nsel = $("input:checked").length
  	console.log nsel
  	StatMine.set "nselected", nsel == 2

  index: ->
        Table.load (error, tables) ->
            throw error if error
            StatMine.set "tables", tables
        @render false

$ () ->
	StatMine.run()