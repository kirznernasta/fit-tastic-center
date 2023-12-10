const mongoose = require('mongoose')
const Schema = mongoose.Schema

days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const isDayString = (value) => days.includes(value);


const Training = new Schema(
    {
        trainingType: {type: String, required: true},
        start: {type: String, required: true},
        end: {type: String, required: true},
        days: {
            type: Array, required: true, validate: {
                validator: (daysArray) => {
                    return daysArray.every(isDayString);
                },
                message: 'Invalid day(s) provided in the days array',
            },
        },
    },
    {timestamps: true},
)

module.exports = mongoose.model('Training', Training)