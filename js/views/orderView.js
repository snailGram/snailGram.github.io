var OrderView = Parse.View.extend({
  tagName: 'tr',

  template: _.template(
    '<td><%= date %>'+
    '<td><a href=<%= frontImg %> ><img src=<%= frontImg %> ></img></a>'+
    '<td><a href=<%= backImg %> ><img src=<%= backImg %> ></img></a>'+
    '<td><input type="checkbox" class="toggle" <%= checked %> >'
  ),

  events: {
    "click .toggle": "toggleOrder",
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
    var checked = '';
    if(this.model.get('completed')){
      checked = 'checked';
      this.$el.addClass('complete');
    }
    return this.$el.html(this.template({
      date: this.model.createdAt.toLocaleString(),
      frontImg: this.model.get('front_image').url(),
      backImg: this.model.get('imageFile').url(),
      checked: checked
    }));
  }
});
