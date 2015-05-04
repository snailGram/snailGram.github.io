var OrderList = Parse.Collection.extend({
  model: Order,

  perPage: 10,
  orderCount: null,
  pages: null,

  comparator: function(order) {
    return order.createdAt*-1;
  },

  initialize: function(params) {
    var self = this;

    this.query = new Parse.Query(Order)
    this.query.exists('front_image').exists('back_image').exists('full_image').descending('createdAt');
    if (params.filter !== 'all') {
      this.query.equalTo('completed', params.filter);
    }

    this.query.count({
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
    self.fetch()
    .then(function() {
      var promise = new Parse.Promise.as();
      self.map(function(order){
        promise = promise.then(function(){
          var query = new Parse.Query(Parse.User);
          query.equalTo('username', order.get('user').id);
          query.first().then(function(user){
            order.set('email', user.get('email'));
            promise = order.save();
          });
        });
      });
      return promise;
    })
    .then(function(){
      self.trigger('update', self);
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
