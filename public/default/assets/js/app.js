var Index = {
    initiate: function () {
        $.material.init();
    },
    Actions: {
        sidebar: function() {
            var sidebar = $('.sidebar');
            var overlay = $('.overlay');
            sidebar.toggleClass('sidebar-open');
            if (sidebar.hasClass('sidebar-open')) {
                overlay.addClass('active');
                overlay.animate({opacity: '0.5'}, 100);
            } else {
                overlay.removeClass('active');
                overlay.animate({opacity: '0'}, 500);
            }
        }
    }
};
Index.initiate();

var Me = {

};

$(document).ready(function() {
    
    
    $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

    /*$('.sidebar-switch').click(function() {
        var sidebar = $('.sidebar');
        sidebar.toggleClass('sidebar-open');
        if (sidebar.hasClass('sidebar-open')) {
            overlay.addClass('active');
            overlay.animate({opacity: '0.5'}, 100);
        } else {
            overlay.removeClass('active');
            overlay.animate({opacity: '0'}, 500);
        }
    });*/

    

});
    