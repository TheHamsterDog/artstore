const Router = require('express').Router();
import User from '../models/user';
import auth from '../middleware/auth'
import Art from '../models/art';
import Ratings from '../models/ratings';

Router.get('/auth/:id', auth, async (req, res) => {
    try {
        const art = await Art.findById(req.params.id)

        const user = await User.findById(req.user)

        const ratings = (await Ratings.find({
            art: art._id
        })).length
        const rated = await Ratings.findOne({
            art: art._id,
            user: user._id,
        })
        if (!rated) {
            return res.json({
                ratings, rated: {
                    art: art._id,
                    user: user._id,
                    rating: 0
                }
            });
        }
        return res.json({ ratings, rated });
    }
    catch (err) {
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "Not found"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.get('/:id', auth, async (req, res) => {
    try {
        const art = await Art.findById(req.params.id)
        const ratings = (await Ratings.find({
            art: art._id
        })).length

        return res.json({ ratings });
    }
    catch (err) {
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "Not found"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})

Router.put('/:id/:rating', auth, async (req, res) => {
    try {
        const ratings = Number(req.params.rating)
        if (isNaN(req.params.rating) || (ratings !== 0 && ratings !== 1 && ratings !== -1)) {
            return res.status(400).json({
                error: "Invalid Request"
            })
        }
        const user = await User.findById(req.user)
        const art = await Art.findById(req.params.id)
        if (!art) {
            return res.status(400).json({
                error: "Not found"
            })
        }
        const exists = await Ratings.findOne({
            user: user._id,
            art: art._id
        })
        if (exists) {
            art.rating -= exists.rating;
            art.rating += ratings;
            await art.save()
            exists.rating = ratings;
            await exists.save()
            return res.json({
                msg: "Done",
                rating: exists
            })
        }
        const rating = new Ratings({
            user: user._id,
            art: art._id,
            rating: ratings
        })
        art.rating += ratings;
        await art.save()
        if (ratings === 1) {
            const author = await User.findById(art.user)
            author.balance += process.env.weiAwardedPerLike
            await author.save()
        }
        await rating.save()
        return res.json({
            msg: "Done",
            rating
        })
    }
    catch (err) {
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "Not found"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})

export default Router