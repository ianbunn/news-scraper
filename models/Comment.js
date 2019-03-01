const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    body: {
        type: String,
        validate: [
            (text)=> {
                return text.length > 0
            },
            "EMPTY COMMENT ERROR: Please enter a valid comment"
        ]
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model("Comment", CommentSchema)

module.exports = Comment