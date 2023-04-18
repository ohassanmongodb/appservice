const reload = () =>{
    const APP_ID = 'application-1-bzgbi';
    const ATLAS_SERVICE = 'mongodb-atlas';
    const app = new Realm.App({id: APP_ID});
    app.logIn(Realm.Credentials.anonymous());
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);


    var collection = mongodb.db("msg").collection("msg");


    navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude; 
        var match = {
            $match:{
                position: {
                    $near:  [latitude,longitude],
                    $maxDistance: 10
                }
            }
        };
        var limit = {
            $limit:5
        };
        var pipeline = [match,limit];
        var messages1 = collection.aggregate(pipeline);
        messages1.then(ms =>{
            console.log(ms);
            ms.forEach(m =>{
                $("#results").append("<div class='alert alert-danger'>"+m.message+"</div>")
            })
        });
     });
}
(function(){

    setTimeout(reload(),5000)

    
})();


