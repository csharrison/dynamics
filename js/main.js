var dxdt,dydt, WIDTH, HEIGHT;

var ymin = -10,
	ymax = 10,
	xmin = -10,
	xmax = 10,
	step = .1,
	tend = 15,
	t0 = 0;

function screenToXY(x,y){
	var sx = (x/WIDTH) * (xmax - xmin) + xmin;
	var sy = ((HEIGHT - y)/HEIGHT) * (ymax - ymin) + ymin;
	return [sx, sy];
}
function XYToScreen(sx,sy){
	var x = WIDTH * ((sx - xmin)/(xmax - xmin));
	var y = HEIGHT * ((sy - ymin)/(ymax - ymin));
	y = HEIGHT - y;
	return [x,y];
}
$(document).ready(function(){
	var $dxdt = $("#dxdt");
	var $dydt = $("#dydt");

	$("#functions").submit(function(){
		eval("dxdt = function(t,x,y){ return " + $dxdt.val() + "; }");
		eval("dydt = function(t,x,y){ return " + $dydt.val() + "; }");
		step = parseFloat($("#step").val(),10);
		t0 = parseFloat($("#t0").val(),10);
		tend = parseFloat($("#tend").val(),10);

		return false;
	}).submit();
	$("#random").click(function(){
		for(var i = 0; i < 100; i++){
			drawCurve(Math.random()*WIDTH, Math.random()*HEIGHT);
		}
	});
	$("#clear").click(reset);

	var canvas = $("canvas");

	window.context = canvas[0].getContext("2d");
	context.strokeStyle = "red";

	function reset(){
		var c = canvas[0];
		var winheight = $(window).height()- 20;
		HEIGHT = winheight;
		WIDTH = winheight ;
		c.height = HEIGHT;
		c.width = WIDTH;
	}
	window.onresize = reset;
	reset();
	function drawCurve(ex, ey){
		var p = screenToXY(ex, ey);
		var x = p[0],
			y = p[1];


		context.beginPath()


		var points = odeSolve(dxdt, dydt, [x,y] , step, t0, tend);
		context.moveTo(ex, ey);

		for(var i = 0; i < points.length; i++){
			var np = points[i];
			x = np[0],
			y = np[1];

			var sp = XYToScreen(x,y);
			context.lineTo(sp[0],sp[1]);
			context.moveTo(sp[0],sp[1]);
		}
		context.stroke();
	}

	canvas.click(function(e){
		drawCurve(e.offsetX, e.offsetY);
	});
});