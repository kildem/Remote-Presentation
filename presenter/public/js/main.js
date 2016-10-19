Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	
	transition: 'slide', // none/fade/slide/convex/concave/zoom
	
	// More info https://github.com/hakimel/reveal.js#dependencies
	dependencies: [
		{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
		{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
		{ src: 'plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
		{ src: 'plugin/zoom-js/zoom.js', async: true },
		{ src: 'plugin/notes/notes.js', async: true }
	]
});

// presentation id
var presentation_id = 'demo' ; // default to demo presentation

// map the url to the presentation id
var pathNameArr = window.location.pathname.split("/");
if(pathNameArr.length > 1)
	presentation_id = pathNameArr[1];

// connect
var socketP = io.connect('/');

socketP.on('connect', function () {
	console.log("Socket(4000) client connected. Sending cur slide request");
	var sections = document.body.querySelectorAll(".slides > section");
	
	// on connect send presentation request
	socketP.emit('request_presentation', {'id': presentation_id, 'hs':sections.length} );
	
	// init data
	socketP.on('initdata', function(data) {
		console.log("Init socketP: " + JSON.stringify(data) );
		if(data.id == presentation_id)
		{
			// go to the respective slide
			Reveal.navigateTo(data.indexh, data.indexv);
		}
	});
	
	socketP.on('updatedata', function(data) {
		console.log("Receive update socketP: " + JSON.stringify(data) );
		
		if(data.id == presentation_id)
		{
			// go to the respective slide
			Reveal.navigateTo(data.indexh, data.indexv);
		}
	});
	
	
});

