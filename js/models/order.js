var Order = Parse.Object.extend({
  className: 'PostCard',

  initialize: function() {
    if (this.get('complete') === 'undefined') {
      this.set('complete', false);
    }
  },

  toggle: function() {
    debugger;
    this.save({complete: !this.get('complete')});
  }
});
