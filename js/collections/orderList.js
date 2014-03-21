var OrderList = Parse.Collection.extend({
  model: Order,

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
