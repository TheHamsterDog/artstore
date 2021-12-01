const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        //in wei
        require: true,
        default: 0
    },
    description: {
        type: String,
        // required: true,
        default: ''
    },
    ethAddress: {
        type: String,
        required: true,
    },
    image: {
        type: String, required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
userSchema.index({
    "name": "text",
    "description": 'text',
    "userName": 'text',
})
export default mongoose.model('user', userSchema);