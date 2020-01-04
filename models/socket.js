var auth = require('../models/auth');
var mongoHandler = require('../models/mongoHandler');

module.exports = function(io) {
	io.on('connection',function(socket){
        console.log("socketId ----")
        console.log(socket)
		socket.on('room',function(data){
            if(data && data.roomName){// && data.accessToken
                var roomName = data.roomName;
                var token = data.accessToken;
                auth.getUserByToken(token, function(result){
                    console.log("roomName------")
                    console.log(roomName)
                    if(true){ // result
                        socket.join(roomName);
                        if(true) {//data.userName
                            console.log(" room emit----")
                            console.log(roomName)
                            socket.in(roomName).emit('join', 'joined')
                        }
                    }
                })
            }
		});
        socket.on('chat',function(data){
            if(data){//&& data.accessToken
                var roomName = data.roomName;
                var token = data.accessToken;
                console.log("data----")
                console.log(JSON.stringify(data))
                auth.getUserByToken(token, function(result){
                    if(data.message){ // && result
                        console.log("chat roomName----")
                        console.log(roomName)
                        socket.in(roomName).emit('message', data)
                        // mongoHandler.insertMessage(roomName, data.userName, data.videoTime, data.accessToken)
                    }
                })
            }
		});
		socket.on('leave',function(data){
            if(data){// && data.accessToken
                var roomName = data.roomName;
                var token = data.accessToken;
                console.log("data----")
                console.log(JSON.stringify(data))
                auth.getUserByToken(token, function(result){
                    if(true){
                        console.log("chat roomName----")
                        console.log(roomName)
                        socket.leave(roomName);
                    }
                })
            }
		});
	});
};