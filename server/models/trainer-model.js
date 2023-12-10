const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Trainer = new Schema(
    {
        fullName: {type: String, required: true, },
        education: {type: String, required: true},
        coachingExperience: {type: String, required: true},
        image: {type: String, required: true},
        groupTrainings: {type: Array, default: []},
    },
    {timestamps: true},
)

module.exports = mongoose.model('Trainer', Trainer)