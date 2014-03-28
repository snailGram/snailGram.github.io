var Order = Parse.Object.extend({
  className: 'PostCard',

  initialize: function() {
    if (this.get('completed') === 'undefined') {
      this.set('completed', false);
    }
  },

  toggle: function() {
    this.save({completed: !this.get('completed')});
  }
});
