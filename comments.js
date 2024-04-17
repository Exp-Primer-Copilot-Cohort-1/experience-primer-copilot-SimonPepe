// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/comments.html');
});

app.post('/', (req, res) => {
    const name = req.body.name;
    const comment = req.body.comment;
    const date = new Date().toLocaleString();

    fs.appendFileSync('comments.txt', `Name: ${name}, Comment: ${comment}, Date: ${date}\n`);

    res.send('Thank you for your comment!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});