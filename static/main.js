var WIDTH = 20, HEIGHT = 20, DEPTH = 20;

function rand(){
	return (Math.random() * 2) - 1;
}
function is2D(){
	return $("#dzdt").val() === "0";
}
var ymin = -20,
	ymax = 20,
	xmin = -20,
	xmax = 20,
	zmin = -20,
	zmax = 20;
function getColorString(z){
	z = Math.pow(z,2);
	var r = ((z % 255)+255) % 255;;
	var s = "rgb("+r.toFixed() + ", 50,50)";
	console.log(z);
	return s;
}
function evalArguments(){
	var dxdt, dydt, dzdt, step, t0, tend;
	eval("dxdt = function(t,x,y,z){ return " + $("#dxdt").val() + "; }");
	eval("dydt = function(t,x,y,z){ return " + $("#dydt").val() + "; }");
	eval("dzdt = function(t,x,y,z){ return " + $("#dzdt").val() + "; }");
	step = parseFloat($("#step").val(),10);
	t0 = parseFloat($("#t0").val(),10);
	tend = parseFloat($("#tend").val(),10);
	y0 = _.map(['x0','y0','z0'], function(elt){
		return parseFloat($("#"+elt).val(),10);
	});
	return [y0, dxdt, dydt, dzdt, step, t0, tend];
}

function reset(){
	mathbox.remove("*");
	return false;
}

function drawIt(y0, dxdt, dydt, dzdt, step, t0, tend){
	var points = odeSolve(dxdt, dydt, dzdt, y0, step, t0, tend);
	mathbox.grid()
	if(! is2D()){ mathbox.grid({axis:[1,2]});}
	mathbox/*.axis({
	  id: 'x-axis',
	  axis: 0,
	  color: 0xa0a0a0,
	  ticks: 5,
	  lineWidth: 2,
	  size: .05,
	  labels: true,
	})/*
	.axis({
	  id: 'y-axis',
	  axis: 1,
	  color: 0xa0a0a0,
	  ticks: 5,
	  lineWidth: 2,
	  size: .05,
	  labels: true,
	  zero: false,
	})
	.axis({
	  id: 'z-axis',
	  axis: 2,
	  color: 0xa0a0a0,
	  ticks: 5,
	  lineWidth: 2,
	  size: .05,
	  zero: false,
	  labels: true,
	})*/
	.curve({
	  n: points.length,
	  id: Math.random().toString(),
	  data: points,
	  line: true,
	  points: false,
	  lineWidth: 1,
	});
}
DomReady.ready(function(){
	$("#functions").submit(function(){
		reset();
		drawIt.apply(null, evalArguments());
		return false;
	})
	$("#random").click(function(){
		if(is2D()){ DEPTH = 0; }
		for(var i = 0; i < 20; i++){
			var args = evalArguments();
			args[0] = [rand()*WIDTH, rand()*HEIGHT, rand() * DEPTH];
			drawIt.apply(null, args);
		}
		return false;
	});
	$("#clear").click(reset);


});