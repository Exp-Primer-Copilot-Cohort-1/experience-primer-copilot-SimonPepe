//create a web server
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
//parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
//set up the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/comments');
const Comment = require('./models/comment');
//set up the port
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
//set up the routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.json(comments);
        }
    });
});
app.post('/comments', (req, res) => {
    const newComment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    newComment.save((err, comment) => {
        if (err) {
            console.log(err);
        } else {
            console.log(comment);
            res.redirect('/');
        }
    });
});
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.json(comment);
        }
    });
});
app.put('/comments/:id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.json(comment);
        }
    });
});
app.delete('/comments/:id', (req, res) => {
    Comment.findByIdAndRemove(req.params.id, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.json(comment);
        }
    });
});
// Path: models/comment.js
//create a schema
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});
//create a model
const Comment = mongoose.model('Comment', commentSchema);
module