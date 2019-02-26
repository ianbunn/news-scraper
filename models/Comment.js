const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment: {
        type: String,
        validate: [
            (text)=> {
                return text.length > 0
            },
            "EMPTY COMMENT ERROR: Please enter a valid comment"
        ]
    },
    articles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Article"
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment