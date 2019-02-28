$("#scrape").on("click", (articles)=> {
    event.preventDefault()
    return $.ajax({
        type: "GET",
        url: "/scrapearticles",
        data: JSON.stringify(articles)
    }).then((data)=> {
        console.log("Scrape Complete")
    })
})

$("#submit").on("click", ()=> {
    event.preventDefault()
    let articleId = $(this).find(".article").attr("data-id")
    console.log(articleId)
})