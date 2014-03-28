var OrderListView = Parse.View.extend({
  className: 'orderList',

  el: '.content',

  events: {
    'click .logout': 'logout',
    'click #filterBar a': 'filterOrders'
  },

  test:function(){
    alert('click!');
  },

  pageCount: function(){
    var orders = this.collection.length;
    var perPage = 10;
    var pages = Math.ceil(orders / perPage);
    return pages;
  },

  initialize: function() {
    this.$el.html(_.template($("#orderList-template").html()));
    this.collection = new OrderList();
    this.getCollection();
  },

  logout: function() {
    Parse.User.logOut();
    new LoginView();
    this.undelegateEvents();
    delete this;
  },

  getCollection: function() {
    var self = this;
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

  filterOrders: function(e) {
    console.log('filtering orders.');
    var query = new Parse.Query(Order);
    var el = $(e.target);
    var filterValue = el.data('completed');
    if  (filterValue !== 'all') {
      this.collection = query.exists('front_image').exists('imageFile').equalTo('completed', filterValue).limit(10).collection();
    } else {
      this.collection = new OrderList();
    }
    this.getCollection();
  },

  render: function() {
    var self = this;
    var createdAt, table, frontImg, backImg;
    $table = $('#orderTable');
    $table.find('tr:gt(0)').remove();
    $table.append(self.collection.map(function(order){
      return new OrderView({model:order}).render();
    }));

    return this;
  },
});
