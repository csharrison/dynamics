function plus(x,y){ return x + y; }
function sumAll(x){ return _.reduce(x, plus); }

function scale(c,x){
	return _.map(x, function(elt){ return elt * c; });
}
function sum(){
	return _.map(_.zip.apply(null, arguments), sumAll);
}

function getF(dxdt, dydt){
	return function(t, point){
		args = [t].concat(point);
		xdot = dxdt.apply(null, args);
		ydot = dydt.apply(null, args);
		return [xdot, ydot];
	};
}
function odeSolve(dxdt, dydt, initial_value, step_size, t_end){
	f = getF(dxdt, dydt); // convert f from f(t,x,y) -> f(t, array)


	var h = step_size;
	points = [initial_value];
	var y = initial_value;


	function rungeKutta(t, yn){
		var k1 = f(t, yn),
		k2 = f(t + (h/2), sum(yn, scale(h/2, k1))),
		k3 = f(t + (h/2), sum(yn, scale(h/2, k2))),
		k4 = f(t + h, sum(yn, scale(h, k3)));

		return sum(yn, scale(h/6, sum(k1, scale(2, k2), scale(2, k3), k4)));
		// yn + (h/6)*(k1 + 2*k2 + 2*k3 + k4);
	}	
	
	for(var t = 0; t < t_end ; t = t + h){
		var y = rungeKutta(t, y);
		points.push(y);
	}
	return points;
}