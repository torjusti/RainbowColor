RainbowColor
============

`RainbowColor` helps you manipulate and convert colors using a simple and chainable library. To install it you can simply run `bower install RainbowColor` or fetch it here from `lib/rainbow.min.js` and copy it to your own codebase. A file that contains standalone functions is available at `src/standalone_functions.js` that could be useful if you want to implement color algorithms in your own program. It is also possible to use `RainbowColor` with node - just run `npm install RainbowColor` and you are ready to go.

Usage
-----

Getting started with initializing a new RainbowColor object. `RainbowColor` currently supports hex, rgb and hsl colors.

```javascript
new RainbowColor('#FFF', 'hex');
new RainbowColor([255, 255, 255], 'rgb');
new RainbowColor([0, 0, 100], 'hsl');
```

You can translate the color to other color representations using `RainbowColor.get` and providing a supported color.

```javascript
new RainbowColor([0, 0, 0], 'rgb').get('hex'); // #000000
```

Using your new `RainbowColor` object you can now blend colors, darken and lighten if you want to do so.

```javascript
new RainbowColor('#FFFFFF', 'hex').blend(new RainbowColor('#000000', 'hex'), 0.5).get('hex'); // #808080
new RainbowColor('#FFFFFF', 'hex').darken(0.5).get('hex'); // #808080
new RainbowColor('#000000', 'hex').lighten(0.5).get('hex') // #808080
```

Extending RainbowColor
----------------------

You can add your own color modules to `RainbowColor` pretty easily by adding an object to `RainbowColor.colors` which stores all handlers. All handlers must contain one method named `fromRgb` that takes an rgb color and translates to your color module, and one method named `toRgb` which takes your color and translates it to rgb.

```javascript
// Handles hex colors of the form #FFFFFF.
Rainbow.colors.hex = {
  fromRgb: function(rgb) {
    return '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
  },

  toRgb: function(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ];
  }
};
```

Tests
-----

I have recently added a couple tests, and found a ton of bugs while doing so, but they are still lacking. I will continue work on intensive testing. Tests are done using `QUnit` and can be viewed in the `tests` directory.