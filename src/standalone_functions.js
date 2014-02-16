function hslToRgb(h, s, l) {
  function hueToRgb(m1, m2, h) {
    if (h < 0) h += 1;
    if (h > 1) h -= 1;
    if (h < 1 / 6) return m1 + (m2 - m1) * h * 6;
    if (h < 1 / 2) return m2;
    if (h < 2 / 3) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    return m1;
  }
  h = h / 360, s = s / 100, l = l / 100;
  m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  m1 = l * 2 - m2;
  return [
    Math.round(hueToRgb(m1, m2, h + 1 / 3) * 255),
    Math.round(hueToRgb(m1, m2, h) * 255),
    Math.round(hueToRgb(m1, m2, h - 1 / 3) * 255)
  ];
}

function rgbToHsl(r, g, b) {
  r = r / 255, g = g / 255, b = b / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b), h, s, l;
  var h, s, l = Math.round(1 / 2 * (max + min) * 100);
  if (max === min) return [0, 0, l];
  if (max === r && g >= b) h = 60 * (g - b) / (max - min);
  else if (max === r && g < b) h = 60 * (g - b) / (max - min) + 360;
  else if (max === g) h = 60 * (b - r) / (max - min) + 120;
  else if (max === b) h = 60 * (r - g) / (max - min) + 240;
  if (l <= 1 / 2) s = (max - min) / 2 * l;
  else if (l > 1 / 2) s = (max - min) / (2 - 2 * l);
  return [Math.round(h * 360), Math.round(s * 100), l];
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : throw new Error('Unable to parse hex color.');
}

function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function blend(one, two, factor) {
  return [
    Math.round(factor * one[0] + (1.0 - factor) * two[0]),
    Math.round(factor * one[1] + (1.0 - factor) * two[1]),
    Math.round(factor * one[2] + (1.0 - factor) * two[2])
  ];
}

function darken(r, g, b, factor) {
  return blend([0, 0, 0], [r, g, b], factor || 0.5);
}

function lighten(r, g, b, factor) {
  return blend([255, 255, 255], [r, g, b], factor || 0.5)
}