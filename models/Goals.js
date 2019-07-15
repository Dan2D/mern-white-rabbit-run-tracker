const mongoose = require('mongoose');

const runSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    targetPace: {
        type: String,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        default: "Long Distance"
    },
    actualPace: String,
    completed: {
        type: Boolean,
        default: false
    },
    mood: {
        type: Number,
        default: 0
    }
})

const goalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    raceDay: {
        type: Date,
        default: Date.now()
    },
    targetPace: {
        type: String,
        required: true,
        default: "09:30"
    },
    goalDist: {
        type: Number,
        required: true,
        min: 0
    },
    goalType: {
        type: String,
        default: "5K"
    },
    runs: [runSchema],
    actualPace: {
        type: String,
        default: ''
    },
    mood: {
        type: Number,
        default: 3
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const goalListSchema = mongoose.Schema({
    _id: String,
    user: String,
    Goals: [goalSchema]
})

module.exports = mongoose.model('Goals', goalListSchema);

