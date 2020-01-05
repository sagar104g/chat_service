var request = require('request')
var config = require('../config/config')

var checkUserPermission = function (authBody, cb) {

    const options = {
        url: config.AUTH_BASE_URL + '/permission/check_role',
        body: JSON.stringify(authBody),

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': authBody.token
        }
    }
    request.post(options, function (err, response) {
        if (err) {
            cb(false)
        } else {
            let body = JSON.parse(response.body)
            if (body && body.allowed) {
                cb(true)
            } else {
                cb(false)
            }
        }
    })
}
exports.checkUserPermission = checkUserPermission;

var getUserIdByToken = function (token, cb) {
    const options = {
        url: config.AUTH_BASE_URL + '/user/getUserId',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': token
        }
    }
    request.post(options, function (err, response) {
        if (err) {
            cb(err)
        } else {
            let body = JSON.parse(response.body)
            if (body && body.user_id) {
                cb(null, body.user_id)
            } else {
                cb(null, '-1')
            }
        }
    })
}
exports.getUserIdByToken = getUserIdByToken;