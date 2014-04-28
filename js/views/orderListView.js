var OrderListView = Parse.View.extend({
  className: 'orderList',

  el: '.content',

  events: {
    'click .logout': 'logout',
    'click #filterBar a': 'filterOrders',
    'click #pageNav a': 'changePage'
  },

  currentPage: 1,
  currentFilter: 'all',

  initialize: function() {
    this.$el.html(_.template($("#orderList-template").html()));
    this.collection = new OrderList({filter:'all', page:1});
    this.collection.on('update', this.render, this);
  },

  updateCollection: function() {
    this.collection = new OrderList({filter:this.currentFilter, page:this.currentPage});
    this.collection.on('update', this.render, this);
  },

  changePage: function(e) {
    var el = $(e.target);
    var pageJump = el.attr('id');
    switch (pageJump) {
      case 'firstPage':
        this.currentPage = 1;
        break;
      case 'prevPage':
        this.currentPage--;
        break;
      case 'nextPage':
        this.currentPage++;
        break;
      case 'lastPage':
        this.currentPage = this.collection.pages;
      default:
    }
    this.updateCollection();
  },

  filterOrders: function(e) {
    var el = $(e.target);
    this.currentFilter = el.data('completed');
    this.currentPage = 1;
    this.updateCollection();
  },

  logout: function() {
    Parse.User.logOut();
    new LoginView();
    this.undelegateEvents();
    delete this;
  },

  disableLinks: function() {
    if (this.collection.pages === 1) {
      $('.goForward').addClass('disable');
      $('.goForward').hide();
      $('.goBack').addClass('disable');
      $('.goBack').hide();
    } else if (this.currentPage === 1) {
      $('.goBack').addClass('disable');
      $('.goBack').hide();
      $('.goForward').removeClass('disable');
      $('.goForward').show();
    } else if (this.currentPage === this.collection.pages) {
      $('.goForward').addClass('disable');
      $('.goForward').hide();
      $('.goBack').removeClass('disable');
      $('.goBack').show();
    } else {
      $('.goBack').removeClass('disable');
      $('.goBack').show();
      $('.goForward').removeClass('disable');
      $('.goForward').show();
    }
  },

  render: function() {
    var self = this;
    var createdAt, table, frontImg, backImg;
    var pageNum = this.currentPage;
    self.disableLinks();
    $table = $('#orderTable');
    $table.find('tr:gt(0)').remove();
    if (!this.collection.pages) {
      pageNum = 0;
    }
    $('#pageText').text('Page '+pageNum+' of '+this.collection.pages );
    $table.append(self.collection.map(function(order){
      return new OrderView({model:order}).render();
    }));
    return this;
  }
});
