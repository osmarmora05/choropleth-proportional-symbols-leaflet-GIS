export function getColor(d) {
  return d >= 168060
    ? "#800026"
    : d >= 14403
    ? "#BD0026"
    : d >= 7042
    ? "#E31A1C"
    : d >= 4400
    ? "#FC4E2A"
    : d >= 3602
    ? "#FD8D3C"
    : d >= 3353
    ? "#FEB24C"
    : d >= 1498
    ? "#FED976"
    : "#FFEDA0";
}

// https://github.com/mup223/proportionalSymbol
export function getRadius(area) {
  var radius = Math.sqrt(area/Math.PI);
  return radius * .2;
}