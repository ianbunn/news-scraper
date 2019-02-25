// DEPENDENCIES
const express = require("express")
const mongojs = require("mongojs")
const axios = require("axios")
const cheerio = require("cheerio")
const expressHandlebars = require("express-handlebars")

// INITIALIZE EXPRESS
var app = express()
const PORT = process.env.PORT || 3000

// SETUP A STATIC FOLDER (PUBLIC) FOR APP
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// DATABASE CONFIGURATION
const databaseUrl = "mongoScraper"
const collections = ["mongoScrapedData"]

// HOOK MONGOJS CONFIGURATION TO THE DB VARIABLE
const db = mongojs(databaseUrl, collections)
db.on("error", (error)=> {
    console.log("Database Error:", error)
})

app.engine(
    "handlebars",
    expressHandlebars({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// MAIN ROUTE TO APP
require("./routes/htmlRoutes")(app)
require("./routes/apiRoutes")(app)

// USING PORT TO RUN APP
app.listen(3000, ()=> {
    console.log("App running on http://localhost:" + PORT)
})