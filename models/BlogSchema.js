const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    publish: {
        type: String,
    },
    img: {
        type: String,
        default: "https://example.com/default-image.jpg",
    },
    categories: [String],
    tags: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        // required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
            comment: { type: String }, 
            createdAt: { type: Date, default: Date.now },
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);