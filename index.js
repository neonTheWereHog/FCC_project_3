require('dotenv').config();
const mongoose = require("mongoose")
const { urlModel } = require("./schemasAndModels/SAM.js")
const { farOrCar, redirect, deleteURL } = require("./funcsAndControllers/controllers.js")
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.urlencoded({extended: false}))

mongoose.connect(
  process.env.MONGODB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true }
);
/************** 
 * 
 * REQUEST HANDLING SECTION
 *  
***************/

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.get("/api/shorturl/:shortUrl", redirect)

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/delete/:url", deleteURL)

app.post("/api/shorturl", farOrCar)

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
})
