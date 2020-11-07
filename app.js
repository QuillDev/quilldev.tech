//setup express app
const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const chalk = require("chalk");
const favicon = require('serve-favicon');
const routes = require("./routes");
const changelog = require("./makelog");

require('dotenv').config(); //setup dotenv

//string setup for morgan logging
const morganString = chalk`{cyan [:date[iso]] [:method]: {bold :url} [STATUS]: :status => {bold :response-time ms}}`;

//setup express middleware
app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(morgan(morganString));
app.use('/public', express.static(__dirname + "/public"));

//update the changelog page
changelog.updateChangelog();

routes.setup(app);