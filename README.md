RainbowColor
============

`RainbowColor` helps you manipulate and convert colors using a simple and chainable library.

Usage
-----

Getting started with initializing a new RainbowColor object. `RainbowColor` currently supports hex, rgb and hsl colors.

    new RainbowColor('#FFF', 'hex');
    new RainbowColor([255, 255, 255], 'rgb');
    new RainbowColor([0, 0, 100], 'hsl');

You can translate the color to other color representations using `RainbowColor.get` and providing a supported color.

    new RainbowColor([0, 0, 0], 'rgb').get('hex'); // #000000

Using your new `RainbowColor` object you can now blend colors, darken and lighten if you want to do so.

    new RainbowColor('#FFFFFF', 'hex').blend(new RainbowColor('#000000', 'hex'), 0.5).get('hex'); // #808080
    new RainbowColor('#FFFFFF', 'hex').darken(0.5).get('hex'); // #808080
    new RainbowColor('#000000', 'hex').lighten(0.5).get('hex') // #808080