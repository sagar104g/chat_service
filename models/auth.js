var request = require('request')
var config = require('../config/config')

var getUserByToken = function(token, cb){
    const options = {
        url: config.AUTH_BASE_URL+'/authorize/check_role',
        body: JSON.stringify(req.body),

    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token
        }
    }
    request.post(options, function(err, response){
        if(err){
            cb(false)
        }else{
            let body = JSON.parse(response.body)
            if(body && body.allowed){
                cb(true)
            }else{
                    cb(false)
            }
        }
    })
}
exports.getUserByToken = getUserByToken;

var getUserIdByToken = function(token, cb){
    const options = {
        url: config.AUTH_BASE_URL+'/authorize/getUserId',
        body: JSON.stringify(req.body),

    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': token
        }
    }
    request.post(options, function(err, response){
        if(err){
            cb(err)
        }else{
            let body = JSON.parse(response.body)
            if(body && body.user_id){
                cb(body.user_id)
            }else{
                cb(null, '-1')
            }
        }
    })
}
exports.getUserIdByToken = getUserIdByToken;