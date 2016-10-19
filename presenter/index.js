const Pages = require('./handlers/pages');
const Assets = require('./handlers/assets');
let presentations = require('./config').config.presentations;


//exports.register = function (server, options, next) {
const after = function (server, next) {
	
	const present = server.select('presenter');
	
	present.views({
		engines: {
			hbs: require('handlebars')
		},
		relativeTo: __dirname,
		path: './views',
		layoutPath: './views/layout',
		layout: 'default',
		isCached: false,
		partialsPath: './views/partials'
	});
	
	
	present.route([{
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: __dirname + '/public'
			}
		}
	}, {
		method: 'GET',
		path: '/',
		handler: Pages.home
	}, {
		method: 'GET',
		path: '/demo',
		handler: Pages.demo
	}, {
		method: 'GET',
		path: '/myppt',
		handler: Pages.myPpt
	}]);
	
	const io = require('socket.io')(present.listener);
	
	io.on('connection', function (socket) {
		
		console.log('New connection Presenter!');
		
		// once connected need to broadcast the cur slide data
		socket.on('request_presentation', Pages.reqPresent.bind(null, presentations, socket));
		// send commands to make slide go previous/ next/etc
		// this should be triggered from the remote controller
		socket.on('command', Pages.receiveCommand.bind(null, presentations, socket));

	});
	
	next();
};

exports.register = function (server, options, next) {
	server.dependency(['inert','vision'], after);
	next();
}

exports.register.attributes = {
	name: 'presenter'
};