var dxdt,dydt;


$(document).ready(function(){
	var $dxdt = $("#dxdt");
	var $dydt = $("#dydt");

	$("#functions").submit(function(){
		eval("dxdt = " + $dxdt.val());
		eval("dydt = " + $dydt.val());

		return false;
	}).submit();


	var canvas = $("canvas");

	window.context = canvas[0].getContext("2d");
	context.strokeStyle = "red";

	function reset(){
		var c = canvas[0];
		c.height = $(window).height()- 200;
		c.width = $(window).width() - 200;
	}
	window.onresize = reset;
	reset();

	canvas.click(function(e){

		var x = e.offsetX;
		var y = e.offsetY;
		console.log(x,y, dxdt);

		context.beginPath()

		var points = odeSolve(dxdt, dydt, [x,y], .5, 5);
		context.moveTo(x,y);
		for(var i = 0; i < points.length; i++){
			var np = points[i];
			var nx = np[0],
				ny = np[1];

			context.lineTo(nx,ny);
			context.moveTo(nx,ny);
		}
		context.stroke();

	})
});