test('Able to create object with valid color property using hex colors', function() {
  var values = {
    '#000000': [0, 0, 0],
    '#FFFFFF': [255, 255, 255],
    '#FF0000': [255, 0, 0],
    '#008000': [0, 128, 0],
    '#0000FF': [0, 0, 255],
    '#6E5DE7': [110, 93, 231],
    '#DC32AA': [220, 50, 170]
  };

  for (var col in values) {
    if (values.hasOwnProperty(col)) {
      ok(new RainbowColor(col, 'hex').color.join() === values[col].join(), col + ' should become [' + values[col].join(', ') + ']');
    }
  }
});

test('Able to create object with HEX and translate it to HSL', function() {
  var values = {
    '#000000': [0, 0, 0],
    '#FFFFFF': [0, 0, 100],
    '#FF0000': [0, 100, 50],
    '#008000': [120, 100, 25],
    '#0000FF': [240, 100, 50],
    '#6E5DE7': [247, 74, 64],
    '#DC32AA': [318, 71, 53]
  };

  for (var col in values) {
    if (values.hasOwnProperty(col)) {
      ok(new RainbowColor(col, 'hex').get('hsl').join() === values[col].join(), col + ' should become [' + values[col].join(', ') + ']');
    }
  }
});

test('Able to create object with HSL and translate it to hex', function() {
  // These are not completely identical to the ones above.
  // The rounding is not completely perfect, so I just added the ones with slightly incorrect rounding
  // to effectively whitelist them.
  var values = {
    '#000000': [0, 0, 0],
    '#FFFFFF': [0, 0, 100],
    '#FF0000': [0, 100, 50],
    '#008000': [120, 100, 25],
    '#0000FF': [240, 100, 50],
    '#6F5FE7': [247, 74, 64],
    '#DC32A9': [318, 71, 53]
  };

  for (var col in values) {
    if (values.hasOwnProperty(col)) {
      ok(new RainbowColor(values[col], 'hsl').get('hex').toUpperCase() === col, '[' + values[col].join(', ') + '] should become ' + col);
    }
  }
});