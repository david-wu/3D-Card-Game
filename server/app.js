
const http = require('http');
const express = require('express');
const SocketIo = require('socket.io');
const configs = require('./configs.js');

const app = express();
app.use(express.static(configs.distPath));

const server = http.createServer(app)
const socketIo = SocketIo(server);


server
	.listen(configs.port, function(err){
		console.log('listening', configs.port)
	});

