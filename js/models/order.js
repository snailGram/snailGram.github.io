var Order = Parse.Object.extend({
  className: 'PostCard',

  initialize: function() {
  },

  initComplete: function() {
    this.save({'completed': false});
  },

  toggle: function() {
    this.save({completed: !this.get('completed')});
  }
});
