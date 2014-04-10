# Circle Loading SVG

Animation to draw a circle around an element (jQuery plugin).

Basically a clone of the [circle-loading](https://github.com/romainberger/circle-loading) plugin I've made before, but with SVG. Why? Because the canvas version looks like cr*p on iPad / iPhone because of the aliasing. This one looks (hopefully) better.

[Demo](http://romainberger.github.io/circle-loading-svg)

## Installation

Drop jQuery and the file `circle-loading-svg.js` in your page.

With bower:

    bower install circle-loading-svg

## Usage

    var span = $('span')

    // Initialisation
    span.circleLoading()

    // Start the animation
    span.circleLoading('start')

    // Stop the animation
    span.circleLoading('stop')

You can find a complete working example in the `gh-pages` branch.

## Options

You can set some options while initializing the plugin:

    var span = $('span')

    span.circleLoading({
        strokeStyle: '#f00'
      , speed:       30
    })

Complete list of options available:

* ***speed***: Speed of the animation - default to 10ms
* ***lineWidth***: Width of the line - default to 1
* ***strokeStyle***: Color of the line - default to `#000`
* ***fade***: Use a fade in / fade out - default to `true`
* ***speedFadeIn***: Speed of the fade at the beginning in milliseconds - default to 300
* ***speedFadeOut***: Speed of the fade at the end in milliseconds - default to 300
* ***stopOnComplete***: Determine if the animation is supposed to be looped or stops when the circle is complete - default to false (loop)


### Methods

You can also update some options after the initializing - including while the animation is running

    // Change the color of the line
    span.circleLoading('strokeStyle', '#0f0')

    // Change the speed of the animation
    span.circleLoading('speed', 10)

## Compatibility

The plugin works with svg so it will need a [relatively recent browser](http://caniuse.com/#search=svg).

# License

MIT
