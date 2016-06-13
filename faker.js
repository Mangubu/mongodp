'use strict'

const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;

var usersTab = [];
for(let i=0; i<1000; i++){
    usersTab.push({
        'username': faker.internet.userName(),
        'displayname': faker.internet.userName(),
        'email': faker.internet.exampleEmail()
    });
}

MongoClient.connect("mongodb://localhost:27017/projet3", function(err, db) {
    db.createCollection(
        'users',
        {
            'validator':{
                $and:[
                    { username: { $type: "string" } },
                    { displayname: { $type: "string" } },
                    { email: { $regex: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i } }
                ]
            }
        })
    .then(function(){
        console.log('Done')
        db.close();
        console.log('Close')

    });
})