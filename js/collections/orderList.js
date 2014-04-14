var OrderList = Parse.Collection.extend({
  model: Order,

  perPage: 10,
  orderCount: null,
  pages: null,

  query: (new Parse.Query(Order)).exists('front_image').exists('back_image').exists('full_image').ascending('createdAt'),

  comparator: function(order) {
    return order.createdAt;
  },

  initialize: function(params) {
    var self = this;
    if (params.filter !== 'all') {
      self.query.equalTo('completed', params.filter);
    }
    self.query.count({
      success: function(total) {
        self.orderCount = total;
        self.pages = Math.ceil(self.orderCount / self.perPage);
        self.query.skip((params.page - 1) * self.perPage).limit(self.perPage);
        self.fetchOrders();
      },
      error: function(err) {
        console.log('Error retrieving count');
      }
    });
  },

  fetchOrders: function() {
    var self = this;
    self.fetch({
      success: function(collection) {
        self.trigger('update', self);
      },
      error: function(err) {
        console.log('Error fetching collection');
      }
    });
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
