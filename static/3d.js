function mathboxSetup(mathbox) {
  // Viewport camera/setup
  mathbox
    // Cartesian viewport
    .viewport({
      type: 'cartesian',
      range: [[-150, 150], [-15, 15], [-15, 15]],
      scale: [1.5, 1, 1],
    })
    .camera({
      orbit: 13.5,
      phi: Math.pi/2,
      theta: 0,
    })
    .transition(300)
}

DomReady.ready(function(){

var mathboxScript = [/*
    ['add', 'curve', {
      id: 'my-curve',
      domain: [-3, 3],
      expression: function (x, i) {
        return [x, Math.sin(x), 0];
      },
    }, {
      delay: 500,
      duration: 300,
    }],

*/];

var mathbox = window.mathbox = mathBox({
  cameraControls: true,
  cursor:         true,
  controlClass:   ThreeBox.OrbitControls,
  elementResize:  true,
  fullscreen:     true,
  screenshot:     true,
  stats:          false,
  scale:          1,
}).start();

// Set up director
var script = window.mathboxScript;
var director = window.director = new MathBox.Director(mathbox, script);

// Arrow controls
// Controls for stand-alone
window.addEventListener('touchstart', function (e) {
  director.forward();
  document.getElementById('info').style.opacity = '0';
});
window.addEventListener('keydown', function (e) {
  if (e.keyCode == 38 || e.keyCode == 37) director.back();
  else if (e.keyCode == 40 || e.keyCode == 39) director.forward();
  else {
    return;
  }
});
mathboxSetup(mathbox);

});