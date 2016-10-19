exports.home = function (request, reply) {
	return reply.view('controller', {
		title: 'Remote Presentation Controller'
	})
};