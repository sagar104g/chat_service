var mongo = require('../utils/mongoQueries');
var auth = require('../models/auth');
config = require('../config/config')

var insertMessage = function(chatRoom, username, videoTime, userId, token){
    let insertObject = {
        "chat_room": chatRoom,
        "userName": username,
        "videoTime": videoTime,
        "user_id": userId
    }
    mongo.insertOne(config.messageDb, chatRoom, insertObject, function(err, result){
        if(err){
            console.log(err)
        }
    })
}
exports.insertMessage = insertMessage;