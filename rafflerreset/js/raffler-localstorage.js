(function() {
  var _ref, _ref1, _ref2, _ref3,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) 
{ if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.Raffler = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function() {
      new Raffler.Routers.Entries;
      return Backbone.history.start();
    }
  };

  Raffler.Models.Entry = (function(_super) {
    __extends(Entry, _super);

    function Entry() {
      _ref = Entry.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Entry.prototype.defaults = {
      name: '',
      winner: false
    };

    return Entry;

  })(Backbone.Model);

  Raffler.Collections.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref1 = Entries.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    Entries.prototype.model = Raffler.Models.Entry;

    Entries.prototype.localStorage = new Store('backbone-coffee-raffle-reset');

    return Entries;

  })(Backbone.Collection);

  Raffler.Views.EntriesIndex = (function(_super) {
    __extends(EntriesIndex, _super);

    function EntriesIndex() {
      _ref2 = EntriesIndex.__super__.constructor.apply(this, arguments);
      return _ref2;
    }

    EntriesIndex.prototype.template = _.template($('#item-template').html());

    EntriesIndex.prototype.events = {
      'click #newvalue': 'createEntry',
      'click #draw': 'drawWinner',
      'click #reset': 'resetWinners',
      'click li': 'kill'
    };

    EntriesIndex.prototype.initialize = function() {
      this.collection.on('sync', this.render, this);
      this.collection.on('add', this.render, this);
      return this.collection.on('destroy', this.render, this);
    };

    EntriesIndex.prototype.render = function() {
      $(this.el).html(this.template({
        entries: this.collection.toJSON()
      }));
      return this;
    };

    EntriesIndex.prototype.createEntry = function() {
      return this.collection.create({
        name: $('#new-name').val()
      });
    };

    EntriesIndex.prototype.drawWinner = function() {
      var winner;

      winner = this.collection.shuffle()[0];
      if (winner) {
        winner.set({
          winner: true
        });
        return winner.save();
      }
    };

    EntriesIndex.prototype.resetWinners = function() 
	{
      var g, name, p, _ref3, _results;

      _ref3 = this.collection.models;
      _results = [];
      for (g in _ref3) {
        p = _ref3[g];
        name = p;
        name.set({
          winner: false
        });
        name.save();
      }
      return _results;
    };

    EntriesIndex.prototype.kill = function(ev) {
      var item;
      item = this.collection.find(function(model) {
        return model.get("id") === $(ev.target).attr('id');
      });
      return item.destroy();
    };

    return EntriesIndex;

  })(Backbone.View);

  Raffler.Routers.Entries = (function(_super) {
    __extends(Entries, _super);

    function Entries() {
      _ref3 = Entries.__super__.constructor.apply(this, arguments);
      return _ref3;
    }

    Entries.prototype.routes = {
      '': 'index',
      'entries/:id': 'show'
    };

    Entries.prototype.initialize = function() {
      this.collection = new Raffler.Collections.Entries();
      return this.collection.fetch();
    };

    Entries.prototype.index = function() {
      var view;
      view = new Raffler.Views.EntriesIndex({
        collection: this.collection
      });
      return $('#container').html(view.render().el);
    };

    Entries.prototype.show = function(id) {
      return console.log("Entry " + id);
    };

    return Entries;

  })(Backbone.Router);

  $(document).ready(function() {
    return Raffler.init();
  });

}).call(this);
