var AppView = Parse.View.extend({
  // Instead of generating a new element, bind to the existing skeleton of
  // the App already present in the HTML.
  el: $("#snailgram"),

  initialize: function() {
    this.render();
  },

  render: function() {
    if (Parse.User.current()) {
      new OrderListView();
    } else {
      new LoginView();
    }
  }
});
