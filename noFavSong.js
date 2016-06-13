/**
 * Created by mangubu on 13/06/2016.
 */
'use strict'
const MongoClient = require('mongodb').MongoClient;
var _ = require('lodash');

MongoClient.connect('mongodb://localhost:27017/projet3', function(err, db) {
    console.log("connected");

    db.collection('users').find().forEach(function(item){
        if(_.isEmpty(item.favoritesSongs)){
            console.log(item.username +" "+ item.displayName, "haven't got any favorite songs");
        }else {
            console.log("All users have fav songs");
        }
    });
});