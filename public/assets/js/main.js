$("#scrape").on("click", (articles)=> {
    event.preventDefault()
    return $.ajax({
        type: "GET",
        url: "/scrapearticles",
        data: JSON.stringify(articles)
    }).then((data)=> {
        console.log("Scrape Complete")
        location.reload()
    })
})

$(".commentsSection").on("click", (articles)=> {
    event.preventDefault()
    return $.ajax({
        type: "GET",
        url: "/getcomments",
        data: JSON.stringify(articles)
    }).then((data)=> {
        location.reload()
    })
})

// SAVE COMMENT
$(".savecomment").on("click", function(event) {
    event.preventDefault()
    let articleId = $(this).attr("data-id")
    let comment = $(this).prev().val()
    console.log(articleId, comment)
    return $.ajax({
        method: "POST",
        url: "/articles/" + articleId,
        data: {
            body: comment
        }
    }).then(function (data) {
        console.log(data)
        location.reload()
    })
})

$(".deletecomment").on("click", function (event) {
    event.preventDefault()
    let commentId = $(this).attr("data-comment")
    let articleId = $(this).attr("data-article")
    console.log("delete")
    console.log(commentId)
    console.log(articleId)

    $.ajax({
        method: "GET",
        url: "/comments/" + commentId + "/" + articleId
    }).then(function (data) {
        console.log(data)
        location.reload()
    })
})