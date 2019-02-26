// DEPENDENCIES
const express = require("express")
const mongojs = require("mongojs")
const axios = require("axios")
const cheerio = require("cheerio")
const db = require("../models")

module.exports = function(app) {
    // GET ARTICLES FROM NEWS SITE AFTER USER CLICKS ON SCRAPE BUTTON
    app.get("/scrapearticles", (request, response)=> {

        var results = []
        var title, link

        // AXIOS GET NEWS FROM URL
        axios.get("https://theconversation.com/us/technology").then(function (response) {

            // LOAD THE HTML BODY FROM AXIOS INTO CHEERIO
            var $ = cheerio.load(response.data)

            // FOR EACH ELEMENT WITH A "TITLE" CLASS
            $("article").each(function (i, element) {

                title = $(element).children().text().trim()
                title = title.replace(/\r?\n|\r/g, "")
                link = $(element).find("a").attr("href").trim()
                link = link.replace(/\r?\n|\r/g, " ")
                link = `https://theconversation.com${link}`

                // SAVE THESE RESULTS IN AN OBJECT THAT PUSH INTO THE RESULTS ARRAY
                results.push({
                    title: title,
                    link: link
                })
            })
            console.log(results)
        })

        // SEND A "SCRAPE COMPLETE" MESSAGE TO THE BROWSER
        response.send("Scrape Complete")
    })

    // SAVE ARTICLE FROM NEWS SITE INTO mongoScraper/mongoScrapedData AFTER USER CLICKS ON SAVE ARTICLE BUTTON

    // GET SAVED ARTICLES FROM mongoScraper/savedArticles

}