$("#scrape").on("click", (articles)=> {
    // event.preventDefault()
    return $.ajax({
        type: "GET",
        url: "/scrapearticles",
        data: JSON.stringify(articles)
    }).then((data)=> {
        location.reload()
    })
})