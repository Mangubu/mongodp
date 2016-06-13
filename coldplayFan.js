/**
 * Created by mangubu on 13/06/2016.
 */

'use strict'
const MongoClient = require('mongodb').MongoClient;
var _ = require('lodash');

MongoClient.connect('mongodb://localhost:27017/projet3', function(err, db) {
    console.log("Connecté");

    var Users = db.collection('users');
    var tempUser;

    //Affiche les users sans chansons favorites
    Users.find().forEach(function(item){
        //Afiche les users fan d'un chanson de coldplay
        for(var i = 0; i < item.favoritesSongs.length; i++){
            if(item.favoritesSongs[i] != null){
                if(item.favoritesSongs[i].artist === "Coldplay"){
                    if(tempUser !== item.username){
                        console.log(item.username + " is a Coldplay fan.");
                    }
                    tempUser = item.username;
                }
            }
        }

    });

});