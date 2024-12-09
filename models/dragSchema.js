const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DragSchema = new Schema({
    questions: {
        type: String,
    },
    img: {
        type: String,
        default: "https://example.com/default-image.jpg",
    },
    options: [String],
    progess: {
        type: String,
    },
    answare: {
        type: String,
    },
    timmer: {
        type: String,
    },
    topic: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('drag', DragSchema);