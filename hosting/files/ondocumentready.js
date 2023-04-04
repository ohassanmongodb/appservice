
(function(){

    setInterval(position, 5000);
})();


function position() {
    var APP_ID = 'application-1-bzgbi';
var ATLAS_SERVICE = 'mongodb-atlas';
var app = new Realm.App({id: APP_ID});
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude; 
        console.log(latitude);
        console.log(longitude);
        collMovies = mongodb.db("position").collection("currentPosition");
        collMovies.insertOne({latitude:latitude,longitude:longitude})
     }); }
