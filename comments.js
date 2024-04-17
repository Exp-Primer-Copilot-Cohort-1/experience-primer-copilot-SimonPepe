//Create a web server
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const comments = require('./comments');
//const comments = require('./comments');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get('/comments', (req, res) => {
  comments.getComments((err, comments) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.json(comments);
    }
  });
});

app.post('/comments', (req, res) => {
  const comment = req.body.comment;
  comments.addComment(comment, (err, newComment) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.status(201).json(newComment);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;