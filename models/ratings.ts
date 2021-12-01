const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    art: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "art"
    },
    rating: {
        type: Number,
        enums: [-1, 1, 0],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model('rating', ratingSchema);