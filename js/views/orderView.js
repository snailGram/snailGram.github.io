var OrderView = Parse.View.extend({
  tagName: 'tr',

  template: _.template(
    '<td><%= date %>'+
    '<td><a download="<%= user %>_<%= salt %>_front.jpg" href="<%= frontImg %>"><img src=<%= frontImg %> ></img></a>'+
    '<td><a download="<%= user %>_<%= salt %>_back.jpg" href="<%= backImg %>"><img src=<%= backImg %> ></img></a>'+
    '<td><a href="mailto:<%= email %>" class="eText"><%= email %></a></td>'+
    '<td><input type="checkbox" class="toggle" <%= checked %> >'
  ),

  events: {
    "click .toggle": "toggleOrder"
  },

  toggleOrder: function(){
    this.model.toggle();
    if (this.model.get('completed')) {
      this.$el.addClass('complete');
    } else {
      this.$el.removeClass('complete');
    }
  },

  render: function() {
    var self = this;
    var checked = '';
    var email = '';

    if (this.model.get('completed')){
      checked = 'checked';
      this.$el.addClass('complete');
    } else if (typeof this.model.get('completed') === 'undefined') {
      // Need to initialize completed to false
      // Can't do in model because of fetch process in collection
      this.model.initComplete();
    }
    var query = new Parse.Query(Parse.User);
    query.equalTo('username', this.model.get('user').id);
    query.first({
      success: function(user){
        email = user.get('email');
      },
      error: function(err){
        console.log("Error retrieving user's email");
      }
    });
    return this.$el.html(this.template({
      date: this.model.createdAt.toLocaleString(),
      salt: this.model.createdAt.getTime(),
      user: this.model.get('pfUserID'),
      frontImg: this.model.get('front_image').url(),
      backImg: this.model.get('back_image').url(),
      fullImg: this.model.get('full_image').url(),
      email: this.model.get('email'),
      checked: checked
    }));
  }
});
