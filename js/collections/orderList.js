var OrderList = Parse.Collection.extend({
  model: Order,

  query: (new Parse.Query(Order)).exists('front_image').exists('back_image').ascending('createdAt').limit(10),

  comparator: function(order) {
    return order.createdAt;
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
