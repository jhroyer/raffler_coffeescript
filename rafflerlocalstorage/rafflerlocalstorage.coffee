window.Raffler =
  Models:{}
  Collections: {}
  Views: {}
  Routers: {}
  init: -> 
    new Raffler.Routers.Entries
    Backbone.history.start()

class Raffler.Collections.Entries extends Backbone.Collection
  url: '~jroyer1/is698cs/403598/hw12/rafflerlocalstorage/'
    
class Raffler.Views.EntriesIndex extends Backbone.View
  template: _.template($('#item-template').html())
  initialize: ->
    @collection.on('sync', @render, this)
  render: ->
    $(@el).html(@template(entries: @collection.toJSON()))
    this

class Raffler.Routers.Entries extends Backbone.Router
  routes:
    '': 'index'
    'entries/:id': 'show'
  initialize: ->
    @collection = new Raffler.Collections.Entries()
    @collection.fetch()
  index: ->
    view = new Raffler.Views.EntriesIndex(collection: @collection)
    $('#container').html(view.render().el)
  show: (id) ->
    console.log "Entry #{id}"

$(document).ready ->
  Raffler.init()