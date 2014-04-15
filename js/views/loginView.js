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
    $('.spinner').show();
    $('.login-form .error').hide();
    Parse.User.logIn(username, password, {
      success: function(user) {
        new OrderListView();
        self.undelegateEvents();
        self.$(".login-form button").attr("disabled", "disabled");
        delete self;
        $('.spinner').hide();
      },

      error: function(user, error) {
        self.$('.login-form .error').html('Invalid username or password.  Please try again.').show();
        self.$('.login-form button').removeAttr('disabled');
        $('.spinner').hide();
      }
    });

    return false;
  },

  render: function() {
    this.$el.html(_.template($('#login-template').html()));
    this.delegateEvents();
  }


});
