const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({ port: 4000, labels: ['presenter'] });
server.connection({ port: 4001, labels: ['control'] });

server.register([
	require('inert'),
	require('vision'),
	require('./control'),
	require('./presenter')
], (err) => {
	
	if (err) {
		throw err;
	}
	
	server.start((err) => {
		
		if (err) {
			throw err;
		}
		console.log('Server started at: ' + server.connections[0].info.uri);
		console.log('Server started at: ' + server.connections[1].info.uri);
	});
});