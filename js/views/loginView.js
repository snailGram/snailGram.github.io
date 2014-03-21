var LoginView = Parse.View.extend({
  el: ".content",

  initialize: function(){
    this.render();
  },

  events: {
    'submit form.login-form': 'login',
  },

  login: function(e) {
    var self = this;
    var username = this.$('#login-username').val();
    var password = this.$('#login-password').val();
    Parse.User.logIn(username, password, {
      success: function(user) {
        new OrderListView();
        self.undelegateEvents();
        delete self;
      },

      error: function(user, error) {
        self.$('.login-form .error').html('Invalid username or password.  Please try again.').show();
        this.$('.login-form button').removeAttr('disabled');
      }
    });

    this.$(".login-form button").attr("disabled", "disabled");

    return false;
  },

  render: function() {
    this.$el.html(_.template($('#login-template').html()));
    this.delegateEvents();
  }


});
