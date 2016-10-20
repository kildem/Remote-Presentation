exports.home = function (request, reply) {
	return reply.view('controller', {
		title: 'Remote Presentation Controller'
	})
};

exports.getIP = function (request, reply) {
	const cp = require('child_process');
	 const address = cp.execSync('ifconfig | grep inet | grep -v inet6 | cut -d" " -f2 | tail -n1');
	reply(address.toString());
}