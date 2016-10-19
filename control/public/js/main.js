var otherDomain = 'http://localhost:4000/';
var socketP = io.connect(otherDomain);

socketP.on('connect', function () {
	console.log("controller connected to presenter.");
	
	$('#mycontrols .ctl_btn').bind('click', function(){
		
		// send command (up/down/left/right)
		var cmd = $(this).attr('cmd');
		
		// which presentation should I control?
		var whichppt = $('#whichppt').val();
		console.log("clicked: " + cmd + " " + whichppt);
		// send command to Presenter Server
		socketP.emit('command', {'id' : whichppt, 'txt': cmd } );
		
	});
	
});
