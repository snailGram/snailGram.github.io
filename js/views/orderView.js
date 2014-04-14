var OrderView = Parse.View.extend({
  tagName: 'tr',

  template: _.template(
    '<td><%= date %>'+
    '<td><a href="javascript:void(0)"><img src=<%= frontImg %> ></img></a>'+
    '<td><a href="javascript:void(0)"><img src=<%= backImg %> ></img></a>'+
    '<td><input type="checkbox" class="toggle" <%= checked %> >'
  ),

  events: {
    "click .toggle": "toggleOrder",
    "click a": "openModal",
    "click .modal-mask": "closeModal"
  },

  toggleOrder: function(){
    this.model.toggle();
    if (this.model.get('completed')) {
      this.$el.addClass('complete');
    } else {
      this.$el.removeClass('complete');
    }
  },

  openModal: function(e){
    e.preventDefault();
    var url = e.target.getAttribute('src');

    // var ctx = document.getElementById('canvas').getContext('2d');
    // var image = new Image(),

    // image.src = url;

    // image.onload = function() {
    //     ctx.drawImage(img, 0, 0, 4in, 6in);
    // };
    // $('.modal-content').append('<img src="'+url+'"></img>');
    $('body').addClass('no-scroll');
    $('.modal-content').append('<img src="'+url+'"></img>');
    $('.modal-mask').show();
    $('.modal-mask').on('click', '.modal-content', function(e){
      e.preventDefault();
      e.stopPropagation();
      $('.modal-mask').hide();
      $('.modal-content').html('');
      $('body').removeClass('no-scroll');
    });

  },

  closeModal: function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.modal-mask').hide();
    $('.modal-content').html('');
    $('body').removeClass('no-scroll');
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
