const msg = ()=>{
    const APP_ID = 'application-1-bzgbi';
    const ATLAS_SERVICE = 'mongodb-atlas';
    const app = new Realm.App({id: APP_ID});
    app.logIn(Realm.Credentials.anonymous());
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);

    var text = $(".input-block").val();
    console.log(text);
    var collection = mongodb.db("msg").collection("msg");
    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude; 
        var msg = {"message":text,position:[latitude,longitude]};
        console.log(msg);
        collection.insertOne(msg);
     });
}