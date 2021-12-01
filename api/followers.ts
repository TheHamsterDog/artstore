const Router = require('express').Router()
import User from '../models/user';
import auth from '../middleware/auth';
import Followers from '../models/followers';
Router.get('/unauth/:id', async (req, res) => {
    try {
        const artist = await User.findById(req.params.id);

        const follows = (await Followers.find({
            following: artist._id
        })).length;
        return res.json({
            count: follows
        })
    }
    catch (err) {
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "There is no one associated with that user name"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        const artist = await User.findById(req.params.id);
        const exists = await Followers.findOne({
            user: user._id,
            following: artist._id
        })
        const follows = (await Followers.find({
            following: artist._id
        })).length;
        return res.json({
            count: follows,
            followed: exists ? true : false
        })
    }
    catch (err) {
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "There is no one associated with that user name"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.post('/follow/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        const artist = await User.findById(req.params.id);
        const exists = await Followers.findOne({
            user: user._id,
            following: artist._id
        })
        if (exists) {
            exists.delete()
        }
        else {
            const follow = new Followers({
                user: user._id,
                following: artist._id
            })
            await follow.save()
        }
        return res.json({
            msg: "done"
        })
    }
    catch (err) {
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "There is no one associated with that user name"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})

export default Router