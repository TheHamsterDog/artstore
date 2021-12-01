

const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    user: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    following: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
followerSchema.index({
    "$**": "text"
})
export default mongoose.model('follower', followerSchema);