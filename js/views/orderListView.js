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
    var query = new Parse.Query(Order);
    if (this.filterValue !== 'all') {
      this.collection = query.exists('front_image').exists('back_image').equalTo('completed', this.filterValue).skip(10*(nextPage-1)).limit(10).collection();
    } else {
      this.collection = query.exists('front_iamge').exists('back_image').skip(10*(nextPage-1)).limit(10).collection();
    }
    this.getCollection(nextPage);
  },

  disableLinks: function(page) {
    console.log('disabling links');
    debugger;
    if (this.pageCount() === 1) {
      $('.goForward').addClass('disable');
      $('.goBack').addClass('disable');
    } else if (page === 1) {
      $('.goBack').addClass('disable');
      $('.goForward').removeClass('disable');
    } else if (page === this.pageCount()) {
      $('.goForward').addClass('disable');
      $('.goBack').removeClass('disable');
    } else {
      $('.goBack').removeClass('disable');
      $('.goForward').removeClass('disable');
    }
  },

  initialize: function() {
    this.$el.html(_.template($("#orderList-template").html()));
    this.collection = new OrderList();
    this.getCollection(1);
  },

  logout: function() {
    Parse.User.logOut();
    new LoginView();
    this.undelegateEvents();
    delete this;
  },

  getCollection: function(page) {
    var self = this;
    this.collection.fetch({
      success: function(collection) {
        var pages = self.pageCount();
        $('#pageText').text('Page '+page+' of '+pages  );
        self.render();
        self.disableLinks(page);
        self.currentPage = page;
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
    this.getCollection(1);
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
