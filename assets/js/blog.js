$(document).ready(function() {

  $.extend($.scrollTo.defaults, {
    axis: 'y'
  });

  // http://desandro.github.io/masonry/index.html
  var $container = $('#blog-masonry');
  $container.imagesLoaded(function(){
    $container.masonry({
      itemSelector : '.post'
    });
  });

  $('.blog-entry-content a').on('click', function(event) {

    var target = $(event.target);
    if (target.is('a') && target.attr('href').match(/^#/)) {
      event.preventDefault();

      var targetName = target.attr('href').replace(/^#/, '');

      $.scrollTo($('[name=' + targetName + ']'), 650, {
        offset: -90
      });

      window.location.hash = targetName;
    }
  });
});
