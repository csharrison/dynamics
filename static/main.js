var dxdt,dydt, dzdt, WIDTH, HEIGHT;

var ymin = -20,
	ymax = 20,
	xmin = -20,
	xmax = 20,
	zmin = -20,
	zmax = 20,
	step = .1,
	tend = 15,
	t0 = 0;
function getColorString(z){
	z = Math.pow(z,2);
	var r = ((z % 255)+255) % 255;;
	var s = "rgb("+r.toFixed() + ", 50,50)";
	console.log(z);
	return s;
}
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
DomReady.ready(function(){
	var $dxdt = $("#dxdt");
	var $dydt = $("#dydt");
	var $dzdt = $("#dzdt");
	$("#functions").submit(function(){
		eval("dxdt = function(t,x,y,z){ return " + $dxdt.val() + "; }");
		eval("dydt = function(t,x,y,z){ return " + $dydt.val() + "; }");
		eval("dzdt = function(t,x,y,z){ return " + $dzdt.val() + "; }");
		step = parseFloat($("#step").val(),10);
		t0 = parseFloat($("#t0").val(),10);
		tend = parseFloat($("#tend").val(),10);


		var points = odeSolve(dxdt, dydt, dzdt, [1,2,1] , step, t0, tend);

		window.mathbox.curve({
		  n: points.length,
		  id: 'mine-circle',
		  data: points,
		  line: true,
		  points: false,
		  lineWidth: 1,
		})
		return false;


	})
	$("#random").click(function(){
		for(var i = 0; i < 100; i++){
			//drawCurve(Math.random()*WIDTH, Math.random()*HEIGHT);
		}
	});
	$("#clear").click(reset);

	//var canvas = $("canvas");

	//window.context = canvas[0].getContext("2d");

	function reset(){
		var c = canvas[0];
		var winheight = $(window).height()- 20;
		HEIGHT = winheight;
		WIDTH = winheight ;
		c.height = HEIGHT;
		c.width = WIDTH;
	}
	//window.onresize = reset;
	//reset();
	function drawCurve(ex, ey){
		var p = screenToXY(ex, ey);
		var x = p[0],
			y = p[1],
			z = 0;


		context.beginPath()


		var points = odeSolve(dxdt, dydt, dzdt, [x,y,z] , step, t0, tend);
		context.moveTo(ex, ey);

		for(var i = 0; i < points.length; i++){
			var np = points[i];
			x = np[0],
			y = np[1];
			z = np[2];

			var sp = XYToScreen(x,y);
			context.strokeStyle = getColorString(z);
			console.log(context.strokeStyle)
			context.lineTo(sp[0],sp[1]);
			context.moveTo(sp[0],sp[1]);
		}
		context.stroke();
	}

	/*canvas.click(function(e){
		drawCurve(e.offsetX, e.offsetY);
	});*/
});