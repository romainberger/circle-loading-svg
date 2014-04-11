/**
 * Circle Loading SVG
 *
 * @author Romain Berger <romain@romainberger.com>
 * @license MIT
 * https://github.com/romainberger/circle-loading-svg
 *
 * Animation to draw a circle around an element
 *
 * Usage:
 *     var span = $('span')
 *     // init the circle
 *     span.circleLoading()
 *
 *     // start the animation
 *     span.circleLoading('start')
 *     // stop the animation
 *     span.circleLoading('stop')
 *
 *     // change the speed
 *     span.circleLoading('speed', 30)
 *     // change the stroke style
 *     span.circleLoading('strokeStyle', '#f00')
 */
!function($) {

  'use strict';

  var CircleLoading = function(element, options) {
    this.$element = $(element)
    this.options = options

    this.width = this.$element.width()
    this.size  = this.width + 14
    this.position = (this.size - this.width) / 2

    this.pathPosition = this.size / 2
    this.pathRadius   = this.width / 2 + 4

    this.running
    this.i

    this.init()
    this.initialized = true
  }

  CircleLoading.prototype = {
    init: function() {
      var svg = [
          '<svg width="'+this.size+'" height="'+this.size+'" '
        , 'viewPort="0 0 120 120" version="1.1"'
        , 'xmlns="http://www.w3.org/2000/svg">'
        , '<path fill="none" stroke="'+this.options.strokeStyle+'" '
        , 'stroke-width="'+this.options.lineWidth+'">'
        , '</svg>'
      ].join('')

      this.$svg = $(svg)

      this.$svg.css({
          position: 'absolute'
        , top: '-'+this.position+'px'
        , left: '-'+this.position+'px'
      })
      .hide()

      this.$element.append(this.$svg)
      this.$path = this.$svg.find('path')
    },

    start: function() {
      this.i = 0
      this.running = true

      if (this.options.fade) {
        this.$svg.fadeIn(this.options.speedFadeIn)
      }
      else {
        this.$svg.show()
      }

      this._cycle()
    },

    _cycle: function() {
      if (!this.running) {
        return
      }

      var self = this
      this._draw()


      if (this.options.stopOnComplete && this.i >= 360) {
        this.stop()
        return
      }

      setTimeout(function() {
        self.i = self.i < 360 ? self.i + 5 : 0
        self._cycle()
      }, this.options.speed)
    },

    _draw: function() {
      this.$path.attr('d', this.describeArc(this.pathPosition, this.pathPosition, this.pathRadius, 0, this.i))
    },

    polarToCartesian: function(centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0

      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      }
    },

    describeArc: function(x, y, radius, startAngle, endAngle) {
        var start = this.polarToCartesian(x, y, radius, endAngle)
          , end = this.polarToCartesian(x, y, radius, startAngle)
          , arcSweep = endAngle - startAngle <= 180 ? "0" : "1"

        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, arcSweep, 0, end.x, end.y
        ].join(" ")

        return d
    },

    stop: function() {
      this.running = false

      if (this.options.fade) {
        this.$svg.fadeOut(this.options.speedFadeOut)
      }
      else {
        this.$svg.hide()
      }
    },

    speed: function(speed) {
      this.options.speed = speed
    },

    strokeStyle: function(strokeStyle) {
      this.options.strokeStyle = strokeStyle
    }
  }

  $.fn.circleLoading = function(param, args) {
    param = param || false
    args  = args  || false
    var action  = false
      , options = false

    if (param && typeof param === 'string') {
      action = param
    }
    else if (param && typeof param === 'object') {
      options = param
    }

    return this.each(function() {
      this.circle

      if (action) {
        if (typeof this.circle === 'undefined' || !this.circle.initialized) {
          console.error('CircleLoading object not initialized')
        }
        this.circle[action].call(this.circle, args)
      }
      else {
        options = $.extend({}, $.fn.circleLoading.defaults, typeof options === 'object' && options)
        this.circle = new CircleLoading(this, options)
      }
    })
  }

  $.fn.circleLoading.defaults = {
      speed: 10
    , lineWidth: 2
    , strokeStyle: '#000'
    , fade: true
    , speedFadeIn: 300
    , speedFadeOut: 300
    , stopOnComplete: false
  }

}(window.jQuery);
