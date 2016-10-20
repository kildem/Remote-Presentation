var otherDomain = 'localhost:4000/';
var socketP = io.connect(otherDomain);

socketP.on('connect', function () {
	console.log("controller connected to presenter.");
	
	var fireEvent = function(e){
		//console.log(e.type);
		e.preventDefault();
		// send command (up/down/left/right)
		var cmd = $(this).attr('cmd');
		
		// which presentation should I control?
		var whichppt = $('#whichppt').val();
		console.log("clicked: " + cmd + " " + whichppt);
		// send command to Presenter Server
		socketP.emit('command', {'id' : whichppt, 'txt': cmd } );
		
	};
	
	$('#mycontrols').on('touchstart', '.ctl_btn',fireEvent);
	$('#mycontrols').on('click', '.ctl_btn',fireEvent);
	
});
