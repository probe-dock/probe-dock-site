$(document).ready(function() {

  $.extend($.scrollTo.defaults, {
    axis: 'y'
  });

  console.log('foo');
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
