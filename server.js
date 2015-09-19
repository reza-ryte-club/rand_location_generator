var net = require('net');
var mongodb = require('mongodb');
var lucidlocation = require('lucidlocation');
var mongodbClient = mongodb.MongoClient;
var mongodbURI = 'mongodb://localhost/todos';
var collection, client;
mongodbClient.connect(mongodbURI, setupCollection);


function setupCollection(err, db) {
    if (err) throw err;
    collection = db.collection("locations");
}

function getRandomArea(latitude, longitude){

  var randomLocation;
  if(latitude == null || longitude == null){
       randomLocation = lucidlocation.getRandomLocation();
       latitude = randomLocation.latitude;
       longitude = randomLocation.longitude;
    }
  else{
        if(latitude<90 && longitude>0){
              latitude += 0.01;
              longitude +=0.01;
            }
        else{
          randomLocation = lucidlocation.getRandomLocation();
          latitude = randomLocation.latitude;
          longitude = randomLocation.longitude;

        }



    }

  var locData = { imei: "28902890",
                  latitude: latitude.toString(),
                  longitude: longitude.toString(),
                  datetime: new Date(),
                  increment_index: Date.now()
                };

  insertEvent(locData);
  var lastLocation = {latitude: latitude, longitude: longitude};
  return lastLocation;
}

function insertEvent(locData) {

 collection.insert(
 {
           imei: locData.imei,
           latitude: locData.latitude,
           longitude: locData.longitude,
           datetime: locData.datetime,
           increment_index: locData.increment_index
},
            {upsert: true},
        function(err, docs) {
            if (err) {
                console.log("Insert fail");
            } // Improve error handling
        }
    )
}





var count = 0,
    users = {};
var server = net.createServer(function(conn) {
    conn.setEncoding('utf8');
    var nickname;
    conn.write(
        '\n Welcome to AGD IT SLNS Vehicle Tracking System'
    );

    count++;



    conn.on('error', function(e) {


        conn.setTimeout(4000, function() {
            conn.on('data', function(data) {
                    insertEvent(data);








            });

        });


    });




    conn.on('data', function(data) {
        data = data.replace('\r\n', '');
        console.log("bepok");
        var previousLocation = getRandomArea();
        myinterval = setInterval(function(){
          console.log("oi");
            lastLocation = getRandomArea(previousLocation.latitude,previousLocation.longitude);
            previousLocation = lastLocation;



        },10000);


    });

    conn.on('close', function() {
    });


});
/**
 * Listen.
 */

server.listen(8080, function() {
    console.log('\033[96m   server listening on *:8080\033[39m');
});
