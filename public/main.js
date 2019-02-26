$("#scrape").on("click", (articles)=> {
    return $.ajax({
        type: "GET",
        url: "/scrapearticles",
        data: JSON.stringify(articles)
    }).then((data)=> {
        console.log(data)
    })
})