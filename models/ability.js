const mongoose = require('mongoose');

const abilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    uses: {
        type: Number,
        default: -1,
    }
})

module.exports = mongoose.model('ability', abilitySchema);