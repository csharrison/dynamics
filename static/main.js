var WIDTH = 20, HEIGHT = 20, DEPTH = 20;
function rcolor(){
	return parseInt(Math.floor(Math.random()*16777215).toString(16),16);
}
function rand(){
	return (Math.random() * 2) - 1;
}
function is2D(){
	return $("#dzdt").val() === "0";
}


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
	points = $("#points").is(':checked');


	_.each(['dxdt','dydt','dzdt'], function(i){
		var elt = $("#"+i);
		localStorage.setItem(i,elt.val());
	});
	return [y0, dxdt, dydt, dzdt, step, t0, tend, points];
}

function reset(){
	mathbox.remove("*");
	return false;
}

function drawIt(y0, dxdt, dydt, dzdt, step, t0, tend, draw_points, color){
	if(!color){ color = 0x123456}
	var points = odeSolve(dxdt, dydt, dzdt, y0, step, t0, tend);
	mathbox.curve({
	  n: points.length,
	  id: Math.random().toString(),
	  data: points,
	  line: true,
	  points: draw_points,
	  color: color,
	  lineWidth: 2,
	  style: {
	  	color: color
	  }
	});
}
DomReady.ready(function(){
	$("#functions").submit(function(){
		reset();
		mathbox.grid()
		if(! is2D()){ mathbox.grid({axis:[1,2]});}

		drawIt.apply(null, evalArguments());
		return false;
	})
	$("#random").click(function(){
		if(is2D()){ 
			DEPTH = 0; 
		}else{
			mathbox.grid({axis:[1,2]});
		}
		mathbox.grid()
		for(var i = 0; i < 10; i++){
			var args = evalArguments();
			args.push(rcolor());
			args[0] = [rand()*WIDTH, rand()*HEIGHT, rand() * DEPTH];
			drawIt.apply(null, args);
		}
		return false;
	});
	$("#clear").click(reset);

	var $es = $("#examples");
	_.each(window.examples, function(eg){
		var elt = $(document.createElement('button')).text(eg.name);
		elt.click(function(){
			$("#dxdt").val(eg.dxdt);
			$("#dydt").val(eg.dydt);
			$("#dzdt").val(eg.dzdt);
		});
		$es.append(elt);
	});


	_.each(['dxdt','dydt','dzdt'], function(i){
		$("#"+i).val(localStorage.getItem(i));
	});
});