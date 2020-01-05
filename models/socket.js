var auth = require('../models/auth');
var mongoHandler = require('../models/mongoHandler');

module.exports = function (io) {

    io.on('connection', function (socket) {
        socket.on('room', function (data) {
            if (data && data.roomName && data.accessToken && data.userName) {
                auth.getUserIdByToken(data.accessToken, function (err, result) {
                    if (!err && result != '-1') {
                        socket.join(data.roomName);
                        if (data.userName) {
                            io.in(data.roomName).emit('join', data.userName + ' joined')
                        }
                    }
                })
            }
        });
        socket.on('chat', function (data) {
            if (data && data.accessToken && data.roomName) {
                auth.getUserIdByToken(data.accessToken, function (err, result) {
                    if (!err && data.message && result != '-1') {
                        io.in(data.roomName).emit('message', data)
                        mongoHandler.insertMessage(data.roomName, data.userName, data.videoTime, result, data.accessToken)
                    }
                })
            }
        });
        socket.on('leave', function (data) {
            if (data && data.accessToken && data.roomName) {
                auth.getUserIdByToken(data.accessToken, function (err, result) {
                    if (!err && result != '-1') {
                        socket.leave(data.roomName);
                    }
                })
            }
        });
    });
};