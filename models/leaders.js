const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        required: true,
    }},
    {
        timestamps:true
    })
    var Leaders = mongoose.model('Leader',leaderSchema);
    module.exports = Leaders;