var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://abcde0:abcde0@ds015690.mlab.com:15690/todo',{useNewUrlParser:true},(err,db)=>{
   if(err){
       return console.log("error present")
   }else{
       console.log("Mongo db connected");
   }
   //db.close();
});
db.on('error', console.error.bind(console,' connection error;'));

// Define Schema
var mySchema = mongoose.Schema({
  item:String,
})
// compile schema model

var TODOmodel = mongoose.model('TODOmodel', mySchema,'todo');

//var data = [{item:'get milk'},{item:"walk dog"},{item:"kick some coding ass"}]
var mydata =[];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){

    //load page start
    app.get('/todo',function(req,res){

            db.once('open', function(){
            });

            TODOmodel.find({},function(err,data){
              if(err) throw err
                mydata=data;
              console.log(data)
              res.render('todo',{todos:data});
            })


    });

    app.post('/todo',urlencodedParser,function(req,res){
      console.log("someone came in here");
        console.log(req.body.item);

      var insertarray =[
           {item:req.body.item}
      ];


       TODOmodel.collection.insertMany(insertarray,function(err,docs){

          if(err){
            return console.error(err)
          }else{
            console.log("Documents Inserted in the collection")
          }
       });

        if (!req.body){
          return res.sendStatus(400)
        }

          res.send(insertarray); // return to ajax request
    });

    app.delete('/todo/:item',function(req,res){

      TODOmodel.deleteMany({ item: req.params.item.split('-').join(' ')}, function(err,docs) {
        if(err){
          return console.error(err)
        }else{
          console.log("Documents Deleted in the collection")
        }
      });
        res.send('done '); // return to ajax request
    });
};

//database using mlab
