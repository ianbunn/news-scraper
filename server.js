// DEPENDENCIES
const express = require("express")
const mongojs = require("mongojs")
const mongoose = require("mongoose")
const axios = require("axios")
const cheerio = require("cheerio")
const expressHandlebars = require("express-handlebars")
const logger = require("morgan")

// INITIALIZE EXPRESS
var app = express()
const PORT = process.env.PORT || 3000

// REQUIRE ALL MODELS
const db = require("./models")

// LOG ACTIVITY USING MORGAN
app.use(logger("dev"))
// SETUP A STATIC FOLDER (PUBLIC) FOR APP
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// CONNECT TO MONGODB
mongoose.connect("mongodb://localhost/scrapeddata", { useNewUrlParser: true });

// SETTING HANDLEBARS AS TEMPLATE ENGINE
app.engine(
    "handlebars",
    expressHandlebars({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// ROUTES TO APP
require("./routes/htmlRoutes")(app)
require("./routes/apiRoutes")(app)

// USING PORT TO RUN APP
app.listen(3000, ()=> {
    console.log("App running on http://localhost:" + PORT)
})