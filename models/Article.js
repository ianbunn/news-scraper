const mongoose = require("mongoose")

const Schema = mongoose.Schema

var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    comments: {
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    }
})

var Article = mongoose.model("Article", ArticleSchema)

module.exports = Article