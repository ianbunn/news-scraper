const db = require("../models")

module.exports = function(app) {
    // INDEX PAGE
    app.get("/", function(request, response) {
        db.Article.find().sort({timestamp: -1}).then(function(dbArticle) {
            response.render("index", { result: dbArticle})
        }).catch(function(error) {
            response.json(error)
        })
    })

    // SAVED ARTICLES PAGE
    // app.get("/comments", (request, response)=> {
    //     response.send("comments")
    // })

    // SAVED ARTICLES PAGE
    // app.get("/savedarticles", (request, response)=> {
    //     response.render("savedArticles")
    // })
}