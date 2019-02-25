module.exports = function(app) {
    // INDEX PAGE
    app.get("/", (request, response)=> {
        response.render("index")
    })

    // SAVED ARTICLES PAGE
    app.get("/savedarticles", (request, response)=> {
        response.render("savedArticles")
    })
}