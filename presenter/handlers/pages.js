exports.home = function (request, reply) {
	return reply('Hello from Home');
};

exports.demo = function (request, reply) {
	return reply.view('demo', {
		title: 'Demo Presentation'
	})
};

exports.myPpt = function (request, reply) {
	return reply.view('myppt', {
		title: 'My Presentation'
	})
};

exports.receiveCommand = function (presentations, socket, command) {
	console.log("receive command PRESENTER " + JSON.stringify(command) );

	const pptId = command.id;  // powerpoint id
	const cmd = command.txt;   // command can be 'up', 'down', 'left', 'right'
	const updateCommand = function (cur, cmd) {
		const mcmds = new Map();
		mcmds.set('up', curppt => (curppt.indexv === 0) ? curppt : (curppt.indexv--, curppt));
		mcmds.set('down', curppt => {curppt.indexv++; return curppt});
		mcmds.set('left', curppt => (curppt.indexh === 0) ? curppt : (curppt.indexh--, curppt));
		mcmds.set('right', curppt => (curppt.indexh == curppt.hs - 1) ? curppt : (curppt.indexh++, curppt));

		let getCmd = mcmds.get(cmd);
		// check if the command is valid
		return (typeof getCmd == "undefined") ? null : getCmd(cur);
	}
	
	if(presentations[pptId]) {
		var curppt = presentations[pptId];
		let newCmd = updateCommand(curppt, cmd);
		if (newCmd) {
			presentations[pptId] = newCmd;
			//return presentations;
			socket.broadcast.emit('updatedata', presentations[command.id] );
		}
	}
};

exports.reqPresent = function(presentations, socket, data) {
	if(presentations[data.id]) {
		if (data.hs) presentations[data.id]['hs'] = data.hs;
		
		console.log('sending init presentation data PRESENTER ' + JSON.stringify(presentations[data.id]) );
		socket.emit('initdata', presentations[data.id]);
	}
};