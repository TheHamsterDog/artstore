

const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    rating: {
        type: Number,
        default: 0
    },
    keywords: {
        type: [],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
artSchema.index({
    "$**": "text"
})
export default mongoose.model('art', artSchema);