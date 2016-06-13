var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/projet3';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    insertDocuments(db, function() {
        db.close();
    });
});



var updateDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('user');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
        , { $set:
                {
                    username : "test_username",
                    displayName : "test_displayName",
                    email : "email"
                }
        },
        function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field a equal to 2");
            callback(result);
        });
}

var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('user');
    // Insert some documents
    for (var i = 0; i < 30; ++i){

    }
    collection.insertMany([
        {
            username : "test_username1",
            displayName : "test_displayName1",
            email : "test_email1"
        },
        {
            username : "test_username2",
            displayName : "test_displayName2",
            email : "test_email2"
        },
        {
            username : "test_username2",
            displayName : "test_displayName2",
            email : "test_email2"
        }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}
