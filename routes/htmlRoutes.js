const db = require("../models")

module.exports = function(app) {
    // INDEX PAGE
    app.get("/", function(request, response) {
        db.Article.find().then(function(dbArticle) {
            response.render("index", { result: dbArticle})
        }).catch(function(error) {
            response.json(error)
        })
    })

    // SAVED ARTICLES PAGE
    app.get("/savedarticles", (request, response)=> {
        response.render("savedArticles")
    })
}