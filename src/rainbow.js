// @license MIT - http://github.com/bilde/rainbow

(function() {

  // Constructor object. Color is an color that is supported by the core
  // or any optional plugins - see documentation.
  var Rainbow = function(color, type) {
    if (Rainbow.colors[type]) {
      this.color = Rainbow.colors[type].toRgb(color);
      return this;
    } else {
      throw new Error('No color handler ' + type);
    }
  };

  // Returns the color in a specific representation.
  Rainbow.prototype.get = function(type) {
    if (Rainbow.colors[type]) {
      return Rainbow.colors[type].fromRgb(this.color);
    } else {
      throw new Error('No color handler ' + type);
    }
  };

  // Blends two colors together.
  Rainbow.prototype.blend = function(ColorObject, factor) {
    this.color = [
      Math.round(factor * this.color[0] + (1.0 - factor) * ColorObject.color[0]),
      Math.round(factor * this.color[1] + (1.0 - factor) * ColorObject.color[1]),
      Math.round(factor * this.color[2] + (1.0 - factor) * ColorObject.color[2])
    ];
    return this;
  };

  // Darken a color.
  Rainbow.prototype.darken = function(factor) {
    this.blend(new Rainbow([0, 0, 0], 'rgb'), factor);
    return this;
  };

  // Lighten a color.
  Rainbow.prototype.lighten = function(factor) {
    this.blend(new Rainbow([255, 255, 255], 'rgb'), factor);
    return this;
  };

  // Stores different color handlers.
  Rainbow.colors = {};

  // We use RGB internally as a kind of base color space that everything is based of.
  // Converting to and from RGB from RGB is naturally very simple, but it needs to be done
  // so we can abstract this away from everywhere else.
  Rainbow.colors.rgb = {
    fromRgb: function(rgb) {
      return rgb;
    },

    toRgb: function(rgb) {
      return rgb;
    }
  };

  Rainbow.colors.hsl = {
    // Adapted from http://www.w3.org/TR/2011/REC-css3-color-20110607/#hsl-color
    toRgb: function(hsl) {
      function hueToRgb(m1, m2, h) {
        if (h < 0) h += 1;
        if (h > 1) h -= 1;
        if (h < 1 / 6) return m1 + (m2 - m1) * h * 6;
        if (h < 1 / 2) return m2;
        if (h < 2 / 3) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
        return m1;
      }
      var h = hsl[0] / 360, s = hsl[1] / 100, l = hsl[2] / 100;
      m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
      m1 = l * 2 - m2;
      return [
        // Make sure to round the numbers - css does not really handle the
        // result if we do not do it.
        Math.round(hueToRgb(m1, m2, h + 1 / 3) * 255),
        Math.round(hueToRgb(m1, m2, h) * 255),
        Math.round(hueToRgb(m1, m2, h - 1 / 3) * 255)
      ];
    },

    // Adapted from https://en.wikipedia.org/w/index.php?title=HSL_color_space&oldid=184102939
    // For some reason the algorithm disappeared from Wikipedia when the two pages
    // were merged so it is only available from the edit history.
    fromRgb: function(rgb) {
      var r = rgb[0] / 255;
      var g = rgb[1] / 255;
      var b = rgb[2] / 255;

      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);

      var h;
      var s;
      var l = 1 / 2 * (max + min);

      if (max === min) {
        return [0, 0, Math.round(l * 100)];
      }

      if (max === r && g >= b) {
        h = 60 * ((g - b) / (max - min));
      } else if (max === r && g < b) {
        h = 60 * ((g - b) / (max - min)) + 360;
      } else if (max === g) {
        h = 60 * ((b - r) / (max - min)) + 120;
      } else if (max === b) {
        h = 60 * ((r - g) / (max - min)) + 240;
      }

      if (l <= 1 / 2) {
        s = (max - min) / (2 * l);
      } else if (l > 1 / 2) {
        s = (max - min) / (2 - 2 * l);
      }

      return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
    }
  };
  
  // Handles hex colors of the form #FFFFFF.
  Rainbow.colors.hex = {
    fromRgb: function(rgb) {
      return '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    },

    toRgb: function(hex) {
      // If the color does not start with a hash we add it.
      if (/^[a-fA-F0-9]+$/.test(hex)) {
        hex = '#' + hex;
      }

      // If this is a short hex of three letters (#FFF) we try to expand it.
      var extender = /^#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/;
      if (extender.test(hex)) {
        hex = hex.replace(extender, '#$1$1$2$2$3$3');
      }

      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ];
    }
  };

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Rainbow;
  } else {
    window.RainbowColor = Rainbow;
  }

})();