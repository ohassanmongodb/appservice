const APP_ID = 'application-1-bzgbi';
const ATLAS_SERVICE = 'mongodb-atlas';
const app = new Realm.App({id: APP_ID});

// Function executed by the LOGIN button.
const login = async () => {
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        $('#user').empty().append("User ID: " + user.id); // update the user div with the user ID
    } catch (err) {
        console.error("Failed to log in", err);
    }
};

// Function executed by the "FIND 20 MOVIES" button.
const find_movies = async () => {
    let collMovies;
    try {
        // Access the movies collection through MDB Realm & the readonly rule.
        const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
        collMovies = mongodb.db("sample_mflix").collection("movies");
    } catch (err) {
        $("#user").append("Need to login first.");
        console.error("Need to log in first", err);
        return;
    }

    // Retrieve 20 movie titles (only the titles thanks to the projection).
    const movies_titles = await collMovies.find({}, {
        "projection": {
            "_id": 0,
            "title": 1
        },
        "limit": 20
    });

    // Access the movies div and clear it.
    let movies_div = $("#movies");
    movies_div.empty();

    // Loop through the 20 movie title and display them in the movies div.
    for (const movie of movies_titles) {
        let p = document.createElement("p");
        p.append(movie.title);
        movies_div.append(p);
    }
};

// Function executed by the "FIND 20 MOVIES" button.
const asd = async (asd) => {
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    collMovies = mongodb.db("asd").collection("test123");
    collMovies.insertOne({name:asd});
};


const savePosition = async (position) =>{
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude; 
        console.log(latitude);
        console.log(longitude);
        collMovies = mongodb.db("position").collection("currentPosition");
        collMovies.insertOne({latitude:latitude,longitude:longitude})
     });

}


const search = async() =>{
    var APP_ID = 'application-1-bzgbi';
    var ATLAS_SERVICE = 'mongodb-atlas';
    var app = new Realm.App({id: APP_ID});
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    let movies = mongodb.db("sample_mflix").collection("movies");
    let m = movies.find();
    printjson(m);
}


const saveMessage = () =>{
    var APP_ID = 'application-1-bzgbi';
    var ATLAS_SERVICE = 'mongodb-atlas';
    var app = new Realm.App({id: APP_ID});
    app.logIn(Realm.Credentials.anonymous());
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    const latitude = "";
    const longitude = "";
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude; 
        var msg = $("#message").val();
        var obj = {position:[latitude,longitude],text:msg};
        mongodb.db("asd").collection("asd").insertOne(obj);
    });
    

}