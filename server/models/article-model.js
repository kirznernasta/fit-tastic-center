const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Article = new Schema(
    {
        title: {type: String, required: true},
        firstSentence: {type: String, required: true},
        fullText: {type: String, required: true},
        image: {type: String, required: true},
    },
    {timestamps: true},
)

module.exports = mongoose.model('Article', Article)