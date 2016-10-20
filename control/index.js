const Handlers = require('./handlers');

exports.register = function (server, options, next) {
	
	const control = server.select('control');
	control.views({
		engines: {
			hbs: require('handlebars')
		},
		relativeTo: __dirname,
		path: './views',
		layoutPath: './views/layout',
		layout: 'default',
		isCached: false
	});
	
	control.route([{
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
		handler: Handlers.home
	}, {
		method: 'GET',
		path: '/ip',
		handler: Handlers.getIP
	}]);
	
	const io = require('socket.io')(control.listener);
	
	next();
};

exports.register.attributes = {
	name: 'control'
};