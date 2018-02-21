
// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// use json
app.use(bodyParser.json());

// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client/dist')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// require mongoose
var mongoose = require('mongoose');
// Connect to database
mongoose.connect('mongodb://localhost/Authors');
mongoose.Promise = global.Promise;

// create schema and model
let Schema = mongoose.Schema;
let AuthorSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3},
}, {timestamps: true});


let Author = mongoose.model("Author", AuthorSchema);

// Routes
// Root Request
// get all author
app.get('/authors', function(req, res) {
    Author.find({}, function(err, authors) {
        if (err) {  
            console.log("Error retrieving authors");
            console.log(err)
            res.json({message: "Error", error: err});
        } 
        // console.log('posts: ', posts)
        res.json({message: "Success", data: authors});
    })
})


// get one author
app.get('/authors/:id', function(req, res) {
    console.log("enter get")
    Author.findOne({_id: req.params.id}, function(err, author) {
        if(err) {
            console.log('Error retrieving data');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully retrieved a author');
            res.json({message: "Success", data: author});
        }
    })
})

// create new author
app.post('/authors', function(req, res) {
    console.log(req.body)
    var author = new Author({name: req.body.name, 
                    desc: req.body.desc});
            
    // Try to save that new author to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    author.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('Error saving new author');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully added a author');
            res.json({message: "Success", data: author});
        }
    })
})

// update author
app.put('/authors/:id', function(req, res) {
    Author.findOneAndUpdate({_id: req.params.id}, 
                        {$set: { name: req.body.name, desc: req.body.desc}}, 
                        null, function(err) {
        if(err) {
            console.log('Error during author update');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully deleting a author');
            res.json({message: "Success"});
        }
    })
})

// delete author
app.delete('/authors/:id', function(req, res) {
    Author.deleteOne({_id: req.params.id}, function(err) {
        if(err) {
            console.log('Error during delete');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully deleting a author');
            res.json({message: "Success"});
        }
    })
})
app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Author listening on port 8000");
})

   
