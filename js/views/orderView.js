var OrderView = Parse.View.extend({
  tagName: 'li',

  template: _.template($('#order-template').html()),

  events: {
    "click .toggle": "toggleOrder",
    "click .print": "printOrder"
  },

  toggleOrder: function(){
    this.model.toggle();
  },

  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
})
