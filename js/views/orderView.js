var OrderView = Parse.View.extend({
  tagName: 'tr',

  template: _.template(
    '<td><%= date %>'+
    '<td><a href=<%= frontImg %> ><img src=<%= frontImg %> ></img></a>'+
    '<td><a href=<%= backImg %> ><img src=<%= backImg %> ></img></a>'+
    '<td><a href=<%= fullImg %> >Link</a>'+
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
    if (this.model.get('completed')){
      checked = 'checked';
      this.$el.addClass('complete');
    } else if (typeof this.model.get('completed') === 'undefined') {
      // Need to initialize completed to false
      // Can't do in model because of fetch process in collection
      this.model.initComplete();
    }
    return this.$el.html(this.template({
      date: this.model.createdAt.toLocaleString(),
      frontImg: this.model.get('front_image').url(),
      backImg: this.model.get('back_image').url(),
      fullImg: this.model.get('full_image').url(),
      checked: checked
    }));
  }
});
