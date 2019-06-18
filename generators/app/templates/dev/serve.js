var express = require('express');
var serveStatic = require('serve-static');
var chokidar = require('chokidar');
var spawnCommand = require('child_process').spawnSync;
var port = 3456;

var io = require('socket.io')(3457);
var app = express();

var watcher = chokidar.watch('src');
watcher.on('all', (eventName, path) => {
	if (eventName === 'addDir') {
		console.log('Building files...');
		spawnCommand('npm', ['run', 'less']);
		spawnCommand('npm', ['run', 'webpack:dev:build']);
		console.log('Files built!');
	} else if (eventName === 'add') return;
	else if (eventName === 'change') {
		console.log('Building files...');
		if (path.search('.less') !== -1) {
			spawnCommand('npm', ['run', 'less']);
		} else {
			spawnCommand('npm', ['run', 'webpack:dev:build']);
		}
		io.emit('reload');
		console.log('Reloaded!');
	}
});

app.use(serveStatic('./', {
  'index': ['demo.html']
}));
app.listen(port);

console.log('Listening on port ' + port);
console.log('Visit http://localhost:' + port + ' to view your test application');
