const express = require('express');

const app = express();
const MongoClient = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

let db; 
const port = 3000;
app.use(express.json());
const uri = "mongodb+srv://EinarAl:EinarAl@cluster0.2abti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

MongoClient.connect(uri, {useUnifiedTopology:true},function(err,client){
    console.log("connected to MongoDB succesfully");
    db = client.db("mongodb-lecture");
})

app.listen(port,function(req,res){
    console.log("listening at port: " + port);
})
app.get('/addBlog', function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post('/addBlog', function(req,res){
    db.collection('blogs').insertOne({
        title: "titleValue",
        content: "contentValue"
    },function(err,result){
        if(err) throw err;
        res.send("blog added succesfully");
    })
})
app.get('/getBlogs', function(req,res){
    db.collection('blogs').find({}).toArray(function(error,documents){
        if (error) throw error;
        for(let counter = 0; counter < documents.length;counter++){
            res.write("Title: " + documents[counter].title + " Content: " + documents[counter].content + '\n');
        }
        res.end();
    })
})
app.post('/customBlog', function(req,res){
    db.collection('blogs').insertOne({
        title: req.body.title,
        content: req.body.content
    }, function(err,result){
        if(err) throw err;
        res.send('Blog added succesfully');
    })
});

app.get('/findHeroByID', function(req,res){
    db.collection('blogs').findOne({
        _id: req.body._id
    })
    db.collection('blogs').find({"_id" : ObjectID(req.body._id)}).toArray( function(err, documents){
        if (err) throw error;
        console.log(documents)
        res.send(documents)
    })
})