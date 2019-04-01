function map(x, in_min, in_max, out_min, out_max) {
  return ((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
}

function clamp(input, min, max) {
  return input > max ? max : input < min ? min : input
}

function isEven(number) {
  return number % 2 === 0 ? true : false
}

function parabola(timeFraction) {
  return 1 - Math.sin(Math.acos(clamp(timeFraction, 0, 1)))
}

 
