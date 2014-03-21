var OrderListView = Parse.View.extend({
  className: 'orderList',

  el: '.content',

  events: {
    'click .logout': 'logout',
    'click .filterBar a': 'filterOrders'
  },

  initialize: function() {
    var self = this;
    this.$el.html(_.template($("#orderList-template").html()));
    this.collection = new OrderList();
    this.collection.fetch({
      success: function(collection) {
        console.log('successfully fetched collection');
        self.render();
      },
      error: function(collection, error) {
        console.log('error fetching collection');
      }
    });
  },

  logout: function() {
    Parse.User.logOut();
    new LoginView();
    this.undelegateEvents();
    delete this;
  },

  render: function() {
    var self = this;
    var createdAt, table, frontImg, backImg;
    this.collection.map(function(order){
      table = $('#orderTable');
      frontImg = order.get('img_url');
      backImg = order.get('img_url_back');
      table.append('<tr><td>' + order.createdAt.toLocaleString() + '<td><a href<img src='+order.get('image_url')+'></img><td><img src='+order.get('image_url_back')+'></img><td><input type="checkbox" class="toggle" name="completed">');
    });

    return this;
  },
});
