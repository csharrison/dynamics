window.examples = [
{
	name : "Rossler Map",
	dxdt : '-y - z',
	dydt : 'x + .1*y',
	dzdt : '.1 + z*(x - 14)'
},
{
	name : "Lorentz System",
	dxdt : '10*(y - x)',
	dydt : 'x*(28 - z) - y',
	dzdt : 'x*y - (8/3)*z'
},
{
	name : "Lorentz System 2",
	dxdt : '10*(y - x)',
	dydt : 'x*(28 - z) - y',
	dzdt : 'x*y - (8/20)*z'
},
{
	name : "Van der Pol oscillator",
	dxdt : '.3 * (x - (x*x*x)/3 - y)',
	dydt : 'x / .3',
	dzdt : '0'
},
{
	name : "Simple",
	dxdt : "y",
	dydt : "-x + y*z",
	dzdt : "1 - y*y"
},
{
	name : "damped pendulum",
	dxdt : "y",
	dydt : "-.2*y - sin(x)",
	dzdt : "0"
}
/*{
	name : "Rabinovich-Fabrikant",
	dxdt : 'y*(z - 1 + x*x) + .87*x',
	dydt : 'x*(3*z + 1 - x*x) + .87*y',
	dzdt : '-2*z*(1.1 + x*y)'
}*/
];