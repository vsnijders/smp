@StatMine = class StatMine extends Batman.App
  @root "app#index"

Table = class StatMine.Table extends Batman.Model
  @encode "name"
  @resourceName: "table"
  @persist Batman.RestStorage
  @url = "custom/statmine/tables"
  url: -> "custom/statmine/tables?name=#{@get('id')}"

AppController = class StatMine.AppController extends Batman.Controller
  routingKey: 'app'

  index: ->
#          Table.load (error, tables) ->
#             throw error if error
    @render false

StatMine.run()