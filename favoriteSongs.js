/**
 * Created by mangubu on 12/06/2016.
 */

'use strict'
var _ = require('lodash');
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/projet3', function(err, db) {
    console.log("Connected");
    var allSongs = [];
    var cpt = 0;
    var i = 0;
    var UserFavSongs = [];

    //Return random number min/max include
    function Random(min, max) {
        return Math.floor(Math.random() * (max - min +1)) + min;
    };

    //Create favoritesSongs for each users
    db.collection('users').find().forEach(function(item){
        db.collection('users').update({_id: item._id}, {
            $set: {
                favoritesSongs: ["title", "artist"]
            }
        })
    });


    //Get list of all songs
    db.collection('songs').find().forEach(function(song){

        var song = {
            "title": song.title,
            "artist": song.artist
        };

        allSongs[cpt] = song;

        cpt++;

    }, function (err, obj) {
        if (err){console.warn(err);}else{

            // insert favSongs for each user
            db.collection('users').find().forEach(function(item){


                //add a song in list
                function getFavoriteSong() {
                    var rand = Random(0, allSongs.length);
                    var FavSongs = allSongs[rand];

                    return FavSongs;
                };

                //Check if the random song is already a favorite song for the user
                function alreadyFavorite(newSong) {
                    if(_.isEmpty(UserFavSongs) == false){
                        for(var it = 0; it < UserFavSongs.length; it ++){
                            if(typeof (UserFavSongs[it]) != undefined){
                                if(UserFavSongs[it].title === newSong.title){
                                    console.log('already exist');
                                    return true;
                                }else {
                                    return false;
                                }
                            }
                        }
                    }else {
                        return false;
                    }
                };

                //Add newSong to the list
                (function buildNewSong() {
                    while(UserFavSongs.length < 10){
                        var newSong = getFavoriteSong();
                        var exist = alreadyFavorite(newSong);

                        if(exist == true){buildNewSong();}
                        else{
                            UserFavSongs.push(newSong);i++
                        }
                    }
                })();

                //Push songs in favoritesSongs
                db.collection('users').update({favoritesSongs: item.favoritesSongs}, {
                    $set: {
                        favoritesSongs: UserFavSongs
                    }
                }, {}, function (err, obj) {
                    if (err){
                        console.log('down : ',err.message);
                    }else{
                        console.log('add');
                    }
                })
            });
        }
    });
});