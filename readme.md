# MONGOD TP
This is a markdown file build to give the answer at the question of TP from Joan Ortaga 

## Première partie
#### 1-
To see if a mongo process is running:

    > ps -ef | grep mongod | grep -v grep | wc -l | tr -d ' '
Return 1 if a process is ruinning else 0.

To get the port used by the mongodb process ( in the the mongo shell ) :
    
    > myPort()        
Return the value ofthe used port.

To get host informations into the shell :

    > db.hostInfo()

#### 2-    
To stop the process in the mongo shell :

    >use admin
    >db.shutdownServer()
    
#### 3-    
To start a new instance with new dbpath and logpath :

    > mongod --dbpath /Users/username/Desktop/mongodbpath/  --logpath /Users/username/Desktop/mongodbpath/logfile.txt
    
To connect on the shell and see the used information to configure the process : 

    > db.serverCmdLineOpts()
    
#### 3- 
First we have to create a database named 'music':

    > use music

Then you have to import your data from bson file :

    >mongorestore -d music /Users/username/Desktop/projetMongoDB/mymusic


## Deuxième partie
#### 1-

To display the document of the songs collection :

    > db.collection.find()

#### 2-
To have the count of document :
    
    > db.songs.find().count()

In the exercise this command return 19

#### 3-
To display only the titles of Coldplay's songs in the album X & Y the command is :

    > db.songs.find({'artist':'Coldplay', 'album':'X&Y'},{title:1, _id:0})

This command return :

    > { "title" : "Fix You" }
    > { "title" : "Speed of Sound" }
    
#### 4-
To Display the album title and songs of Stromae , ordered by year of more
newest to oldest , and sorted alphabetically by title :

    > db.songs.find({'artist':'Stromae'},{title:1, album:1, _id:0}).sort({year:1}).sort({title:1})
    
It will return : 

    > { "title" : "Alors on danse", "album" : "Cheese" }
    > { "title" : "Formidable", "album" : "Racine carrée" }
    > { "title" : "Papaoutai", "album" : "Racine carrée" }
    > { "title" : "Tous les memes", "album" : "Racine carrée" }
    
#### 5-

To display the group Coldplay songs in an array, where the elements are string having as format TITRE (ALBUM), the command is : 

    > db.songs.find({'artist':'Coldplay'}).map(function(u) { return u.title+'('+u.album+')'; })
    
This command return :

    [
    	"Paradise(Mylo Xyloto)",
    	"The Scientist(A Rush of Blood to the Head)",
    	"Clocks(A Rush of Blood to the Head)",
    	"Fix You(X&Y)",
    	"Speed of Sound(X&Y)"
    ]
    
#### 6-

To display , once, the names of the artists who produced songs from 2002
and 2005 the command is :

    > db.songs.distinct('artist',{ 'year': { $gte: 2002, $lte: 2005 }})
    
This command return 

    > [ "Maroon 5", "Coldplay" ]

#### 7-
The command to create this collection is :

    > db.createCollection('recordLabel',{ capped: true, size: 100000, max:3 },{ validator: { $or:[{ nom: { $type: "string" } },{ url: {$regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/  } }]}} )

this command return :

    > { "ok" : 1 }

It's mean that the collection have been corectly create.

#### 8-
To insert a new document the command is:

    > db.recordLabel.insert( { nom: "<value>" }, {url: "<value>"} )
    
When I add a fourth, the oldest is remplaces by the new.

#### 9-
The command for update the collection id :

    > db.runCommand( { collMod :"recordLabel"  , validator : {$or:[{pays:{$regex: "<value>" }}]} )

#### 10-
###### a-
TTL is a fonctionality which delete automatically the regester of a collection when the TLL is finished.

###### b-
To add a TLL to a collection the command is :

    > db.collection.createIndex() 

###### c-
In our example the command look like :

    > db.recordLabel.createIndex( { "field": "value" }, { expireAfterSeconds: "value" } )

###### d-   
The command is :

    > db.recordLabel2.createIndex( { "lastModifiedDate": 1 }, { expireAfterSeconds: 1000 } )

## Troisième partie
See the github link join.

## Quatrième partie
###### 1-

Embbeded Design :

All information are stocked in the same schema like this :

    > {
        _id: 123456
        contact:{
            firstname : "Leo",
            lastname : "Dupond",
            mail:"test@mail.fr",
            ...
        }
        adress:{
            city : "Paris",
            street : "16 rue de la ville",
            departement:"Ile de france",
            ...
        }
    ...
    }

Separated Collection Design : 

All the information are separated like this :

    >   //Contact document 
        {
            _id: 123456
            firstname : "Leo",
            lastname : "Dupond",
            mail:"test@mail.fr",
            ...
        }
        //Adress document 
        {
            _id: 123456
            contact_id: <ObjectId>
            city : "Paris",
            street : "16 rue de la ville",
            departement:"Ile de france",
            ...
        }
    ...
    
    

