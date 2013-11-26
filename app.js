var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(1234);
console.log("Server Nodejs on 1234");

var numberOfSocket = 0;

var users = new Array();

function handler (req, res) {
    console.log("HTTP Client Connected");
    res.writeHead(200);
    res.end("");
}

io.sockets.on('connection', function (socket) {
	numberOfSocket = numberOfSocket + 1;
	console.log('Inception Socket');
	console.log(numberOfSocket);
	console.log('ID : ');
	console.log(socket.id);
 	socket.on('host', function (data) {
	    console.log('host receive');
            console.log(data);
	    sendSms(data.from,data.to,data.sms)
	
  	});

	socket.on('disconnect', function() {
      	console.log('Got disconnect!');
	console.log(socket.id);
	console.log(socket)
   	});

});

function sendSms(from,to,sms){
	io.sockets.emit(to, {from:from,sms:sms});
}

/*

io.sockets.on('connection', function (socket) {}); Server se chay ham nay khi co bat ki 1 client nao open 1 socket toi server

socket.on('host', function (data) {
		console.log('host receive');
    		console.log(data);
  	});
Host dang ki vao channel va ham xu li khi nhan duoc sms


*/

