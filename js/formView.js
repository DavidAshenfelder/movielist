var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var _ = require('underscore');
var MovieModel = require('./movie');

module.exports = Backbone.View.extend ({

  el: '.headerWrapper',
  template: _.template($('#formTmpl').html()),
  initialize: function(){
    console.log(this);
  },
  events: {
    'submit form': 'handleSubmit',
    'click #dropDown': 'formShow',
    'click #pullUpForm': 'formHide'
  },
  render: function() {
    this.model = new MovieModel();
    var markup = this.template(this.model.toJSON());
    console.log(this.$el);
    this.$el.append(markup);
    return this
  },

  formShow: function() {
    this.render();
  },

  formHide: function() {
    this.$el.children('#inputForm').remove()
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.model.set({
      title: this.$el.find('input[name="title"]').val(),
      cover: this.$el.find('input[name="cover"]').val(),
      releaseDate: this.$el.find('input[name="releaseDate"]').val(),
      rating: this.$el.find('input[name="rating"]').val(),
      plot: this.$el.find('input[name="plot"]').val(),
      category:this.$el.find('input[name="category"]').val(),
    });
    this.model.save();
    this.collection.add(this.model);
    this.$el.find('input').val('');
  }
});
