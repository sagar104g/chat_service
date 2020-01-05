var mongoService = require('../services/mongo')

var insertOne = function(dbName, collectionName, insertObject, cb){

    var db = mongoService.getMongoConnection(dbName)
    db.collection(collectionName).insertOne(insertObject, function(err, res) {
        if(err){
            cb(err)
        }else{
            cb(null ,res)
        }
      });
}
exports.insertOne = insertOne