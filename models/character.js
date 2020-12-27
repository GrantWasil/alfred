const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    personality: {
        type: String,
        required: true,
    },
    goals: [{
        type: String,
    }],
    items: [{
        type: String,
    }],
    money: {
        type: Number,
        required: true,
        default: 0,
    },
    tips: [{
        type: String,
    }],
    abilities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ability',
    }],
    secret: {
        type: String,
        required: true,
    },
    clue: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('character', characterSchema);