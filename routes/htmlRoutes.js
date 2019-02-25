module.exports = function(app) {
    // INDEX PAGE
    app.get("/", function(request, response) {
        response.render("index")
    })

    // SAVED ARTICLES PAGE
    app.get("/savedarticles", (request, response)=> {
        response.render("savedArticles")
    })
}