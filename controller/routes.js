// DEPENDENCIES
const express = require("express")
const router = express.Router()
const mongojs = require("mongojs")
const axios = require("axios")
const cheerio = require("cheerio")
const db = require("../models")

module.exports = function(router) {

    // INDEX PAGE
    router.get("/", function (request, response) {
        db.Article.find()
            .sort({ time: -1 })
            .populate("comments.comment")
            .then(function (dbArticle) {
                response.render("index", { result: dbArticle });
            })
            .catch(function (err) {
                response.json(err);
            });
    });
    
    // GET ARTICLES FROM NEWS SITE AFTER USER CLICKS ON SCRAPE BUTTON
    router.get("/scrapearticles", (req, res)=> {

        // AXIOS GET NEWS FROM URL
        axios.get("https://theconversation.com/us/technology").then(function (response) {

            // LOAD THE HTML BODY FROM AXIOS USING CHEERIO
            var $ = cheerio.load(response.data)

            // FOR EACH ELEMENT WITH AN "ARTICLE" ELEMENT
            $("article").each(function (i, element) {

                // OBJECT TO SAVE INTO MONGODB
                let articleDetails = {}
                
                    // FIND ARTICLE'S TITLE
                    articleDetails.title = $(element).find("a").first().text().trim()
                    articleDetails.title = articleDetails.title.replace(/\r?\n|\r/g, "")
                    
                    // FIND ARTICLE'S SUMMARY
                    articleDetails.summary = $(element).children(".content").text().trim()
                    articleDetails.summary = articleDetails.summary.replace(/\r?\n|\r/g, "")
                    
                    // FIND LINK AND GET HREF ATTR FOR URL
                    articleDetails.link = $(element).find("a").attr("href").trim()
                    articleDetails.link = articleDetails.link.replace(/\r?\n|\r/g, " ")
                    
                    // EDIT TO MAKE URL VALID
                    articleDetails.link = `https://theconversation.com${articleDetails.link}`

                    if(articleDetails.title && articleDetails.link) {
                        db.Article.create(articleDetails).then(function(dbArticles) {
                            response.json(dbArticles)
                        }).catch(function(error) {
                            return error
                        })
                    }
            })
        })

        // SEND A "SCRAPE COMPLETE" MESSAGE TO THE BROWSER
        res.send("Scrape complete!")
    })

    // SAVE COMMENT
    router.post("/articles/:id", (req, res)=> {
        db.Comment.create(req.body)
            .then(function (dbComment) {
                return db.Article.findOneAndUpdate(
                    { _id: req.params.id },
                    { $push: { comments: { comment: dbComment._id } } },
                    { new: true }
                );
            })
            .then(function (dbArticle) {
                console.log(dbArticle);
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    // DELETE COMMENT
    router.get("/comments/:commentid/:articleid", function (req, res) {
        console.log(req.body);
        db.Article.findOneAndUpdate(
            { _id: req.params.articleid },
            { $pull: { comments: { comment: req.params.commentid } } 
        })
            .then(function (data) {
                console.log(data);
                res.json(data);
            })
            .catch(function (err) {
                res.json(err);
            });
    });
}