$(document).ready(function() {
    $('.search').click(function() {
            $('.search').addClass('active');
            $('.line-1').css({
                    'transform': 'rotate(45deg)',
                    'top': '0px',
                    'left': '0px'
            });
            $('.line-2').css({
                    'height':'40px',
                    'opacity':'1'
            });
    });
    $('.line-1, .line-2').click(function() {
            $('.search').removeClass('active').val('');
            $('.line-1').css({
                    'transform': 'rotate(-45deg)',
                    'top': '-20px',
                    'left': '45px'
            });
            $('.line-2').css({
                    'height':'0px',
                    'opacity':'0'
            });

    });
});


const hello = ()=>{
    const APP_ID = 'application-1-bzgbi';
    const ATLAS_SERVICE = 'mongodb-atlas';
    const app = new Realm.App({id: APP_ID});
    app.logIn(Realm.Credentials.anonymous());
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    var text = $("#search").val();
    console.log(text);
    var obj = {message:text};
    if(text){
        mongodb.db("appserv").collection("ices").insertOne(obj)
    }
}

const search = () =>{
    const APP_ID = 'application-1-bzgbi';
    const ATLAS_SERVICE = 'mongodb-atlas';
    const app = new Realm.App({id: APP_ID});
    app.logIn(Realm.Credentials.anonymous());
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    var text = $("#search").val();
    var collection = mongodb.db("appserv").collection("ices");
    var result = collection.aggregate([{
        $match: {
            hello:1
        }
    }]);
    result.then(function(values){
        values.forEach( v =>{
            $(".results").append(v.hello)
        })
    })
}