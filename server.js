'use strict';

// Install express server
const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/access_token', function(req, res) {
    const newUrl = 'https://foursquare.com/oauth2/access_token';
    request({url: newUrl, qs: req.query}).pipe(res);
});  

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);