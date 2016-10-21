var otherDomain = 'localhost:4000/';
var socketP = io.connect(otherDomain);

socketP.on('connect', function () {
	console.log("controller connected to presenter.");

	var btns = document.querySelectorAll('.ctl_btn');
	//var touch$ = Rx.Observable.fromEvent(btns, 'touchstart');
	var click$ = Rx.Observable.fromEvent(btns, 'click');
	
	 //Rx.Observable.merge(touch$, click$)
	click$
		.map(event => ({
			cmd: event.target.getAttribute('cmd'),
			type: event.type
		}))
		.subscribe(obj => {
			var whichppt = document.querySelector('#whichppt').value;
			console.log( obj.type + ": " + obj.cmd + " " + whichppt);
			socketP.emit('command', {'id' : whichppt, 'txt': obj.cmd } );
		});
	
});
