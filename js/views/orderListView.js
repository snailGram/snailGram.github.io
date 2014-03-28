var OrderListView = Parse.View.extend({
  className: 'orderList',

  el: '.content',

  events: {
    'click .logout': 'logout',
    'click .filterBar a': 'filterOrders'
  },

  test:function(){
    alert('click!');
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

  filterOrders: function() {
    console.log('filtering orders.');
  },

  render: function() {
    var self = this;
    var createdAt, table, frontImg, backImg;
    table = $('#orderTable');
    table.append(this.collection.map(function(order){
      return new OrderView({model:order}).render();
    }));

    return this;
  },
});
