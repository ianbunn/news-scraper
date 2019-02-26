// DEPENDENCIES
const express = require("express")
const mongojs = require("mongojs")
const axios = require("axios")
const cheerio = require("cheerio")
const db = require("../models")

module.exports = function(app) {
    
    // GET ARTICLES FROM NEWS SITE AFTER USER CLICKS ON SCRAPE BUTTON
    app.get("/scrapearticles", (request, response)=> {

        // AXIOS GET NEWS FROM URL
        axios.get("https://theconversation.com/us/technology").then(function (response) {

            // LOAD THE HTML BODY FROM AXIOS USING CHEERIO
            var $ = cheerio.load(response.data)

            // FOR EACH ELEMENT WITH AN "ARTICLE" ELEMENT
            $("article").each(function (i, element) {

                // OBJECT TO SAVE INTO MONGODB
                let articleDetails = {}
                
                // FIND ARTICLE'S TITLE
                articleDetails.title = $(".article--header").children("h2").text().trim()
                articleDetails.title = articleDetails.title.replace(/\r?\n|\r/g, "")

                // FIND ARTICLE'S SUMMARY
                articleDetails.summary = $(".content").children("span").text().trim()
                articleDetails.summary = articleDetails.summary.replace(/\r?\n|\r/g, "")

                // FIND LINK AND GET HREF ATTR FOR URL
                articleDetails.link = $(element).find("a").attr("href").trim()
                articleDetails.link = articleDetails.link.replace(/\r?\n|\r/g, " ")
                
                // EDIT TO MAKE URL VALID
                articleDetails.link = `https://theconversation.com${articleDetails.link}`

                // SAVE RESULTS INTO MONGODB
                db.Article.create(articleDetails).then((savedArticles)=> {
                    console.log(savedArticles)
                }).catch((error)=> {
                    console.log(error)
                })
            })
        })

        // SEND A "SCRAPE COMPLETE" MESSAGE TO THE BROWSER
        response.send("Scrape Complete")
    })

    // PENDING: SAVE ARTICLE FROM NEWS SITE INTO mongoScraper/mongoScrapedData AFTER USER CLICKS ON SAVE ARTICLE BUTTON

    // PENDING: GET SAVED ARTICLES FROM mongoScraper/savedArticles

}