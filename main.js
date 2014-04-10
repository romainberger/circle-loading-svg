!function($) {

  'use strict';

  var span = $('span')

  span.circleLoading({
    strokeStyle: '#fff',
    speedFadeOut: 700,
    speed: 10
  })

  var running = false

  span.on('click', function() {
    span.circleLoading(running ? 'stop' : 'start')
    running = !running
  })

}(window.jQuery);
