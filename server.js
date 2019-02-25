// DEPENDENCIES
const express = require("express")
const mongojs = require("mongojs")
const axios = require("axios")
const cheerio = require("cheerio")

// INITIALIZE EXPRESS
const app = express()
const PORT = 3000

// DATABASE CONFIGURATION
const databaseUrl = "mongoScraper"
const collections = ["mongoScrapedData"]

// HOOK MONGOJS CONFIGURATION TO THE DB VARIABLE
const db = mongojs(databaseUrl, collections)
db.on("error", (error)=> {
    console.log("Database Error:", error)
})

// MAIN ROUTE TO APP
app.get("/", (request, response)=> {
    response.send("hello world")
})

app.listen(3000, ()=> {
    console.log("App running on http://localhost:" + PORT)
})