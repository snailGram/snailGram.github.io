var OrderListView = Parse.View.extend({
  className: 'orderList',

  el: '.content',

  events: {
    'click .logout': 'logout',
    'click #filterBar a': 'filterOrders',
    'click #pageNav a': 'changePage'
  },

  currentPage: 1,
  filterValue: 'all',

  pageCount: function() {
    var orders = this.collection.length;
    var perPage = 10;
    var pages = Math.ceil(orders / perPage);
    return pages;
  },

  changePage: function(e) {
    var el = $(e.target);
    var pageJump = el.attr('id');
    var nextPage;
    switch (pageJump) {
      case 'firstPage':
        nextPage = 1;
        break;
      case 'prevPage':
        nextPage = this.currentPage--;
        break;
      case 'nextPage':
        nextPage = this.currentPage++;
        break;
      case 'lastPage':
        nextPage = this.pageCount();
      default:
    }
    if (nextPage === this.pageCount()) {
      $('.goBack').addClass('disable');
      $('.goForward').removeClass('disable');
    } else if (nextPage === 1) {
      $('.goForward').addClass('disable');
      $('.goBack').removeClass('disable');
    } else {
      $('.goBack').removeClass('disable');
      $('.goForward').removeClass('disable');
    }
    var query = new Parse.Query(Order);
    if (this.filterValue !== 'all') {
      this.collection = query.exists('front_image').exists('back_image').equalTo('completed', this.filterValue).skip(10*(nextPage-1)).limit(10).collection();
    } else {
      this.collection = query.exists('front_iamge').exists('back_image').skip(10*(nextPage-1)).limit(10).collection();
    }
    this.getCollection();
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
        var pages = self.pageCount();
        $('#pageText').text('Page 1 of '+pages  );
        self.render();
        this.currentPage = 1;
      },
      error: function(collection, error) {
        console.log('error fetching collection');
      }
    });
  },

  filterOrders: function(e) {
    var query = new Parse.Query(Order);
    var el = $(e.target);
    this.filterValue = el.data('completed');
    if  (this.filterValue !== 'all') {
      this.collection = query.exists('front_image').exists('back_image').equalTo('completed', this.filterValue).limit(10).collection();
      this.collection.comparator = function(order) {
        return order.createdAt;
      };
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
