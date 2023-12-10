const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://kirznernasta:kirznernasta@cluster0.bly1xgi.mongodb.net/', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db