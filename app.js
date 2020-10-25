//setup express app
const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const chalk = require("chalk");
const favicon = require('serve-favicon')
require('dotenv').config(); //setup dotenv

//setup express middleware
app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//setup favicon

const morganString = chalk`{cyan [:date[iso]] [:method]: {bold :url} [STATUS]: :status => {bold :response-time ms}}`;
app.use(morgan(morganString));

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
});

//Listen on port 80 for any traffic
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App Listening on port ${PORT}`);
});