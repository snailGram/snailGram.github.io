var OrderList = Parse.Collection.extend({
  model: Order,

  query: (new Parse.Query(Order)).notEqualTo('image_url', '').notEqualTo('image_url_back', '').ascending('updatedAt').limit(10),

  comparator: function(order) {
    return order.updatedAt;
  },

  initialize: function() {
  },

  completed: function() {
    return this.filter(function(order) {
      return order.get('complete');
    });
  },

  open: function() {
    return this.filter(function(order) {
      return !order.get('complete');
    });
  }

});
