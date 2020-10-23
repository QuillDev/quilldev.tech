//setup express app
const express = require("express");
const app = express();

//path for formatting paths
const path = require("path");

//get helmet logger
const helmet = require("helmet");

//use the public folder in express
//app.use(helmet());
app.use('/public', express.static(__dirname + "/public"));

//Directory for pages to be server from
const pages = path.join(__dirname, "public", "pages");

//main page route
app.get("/", (req, res) => {
    res.sendFile(path.join(pages, "index.htm"));
});

//if the tsubasa prefix is used, redirect to the invite url
app.get("tsubasa", (req, res) =>{
    res.redirect(301, 'https://discord.com/oauth2/authorize?client_id=753764233484828703&permissions=2147483639&scope=bot');
});

//Routes to projects
app.get("/tsubasa", (req, res) => {
    res.sendFile(path.join(pages, "tsubasa.htm"));
});

//Add the source endpoint
app.get("/tsubasa/helper/source", (req, res) => {
    res.redirect(301, 'https://github.com/QuillDev/TsubasaJS');
});

//if we didnt get locked 404 that bih
app.get("*", (req, res) => {
    res.sendFile(path.join(pages, "404.htm"));
})

//Listen on port 80 for any traffic
app.listen(80, () => {
    console.log(`App Listening on port 80`);
});