const Router = require('express').Router()
// const config = require('config');
import User from '../models/user';
const validator = require('oversimplified-express-validator');
import auth from '../middleware/auth';
import Art from '../models/art';
import Rating from '../models/ratings';
import { uploadArt } from '../config/cloudinary';

Router.get('/author/:from/:author', async (req, res) => {
    try {
        if (isNaN(req.params.from)) {
            return res.status(400).json({
                error: "Invalid Request"
            })
        }
        const user = await User.findById(req.params.author)
        const art = await Art.find({ user: user._id }).sort({ createdAt: -1 }).skip(Number(req.params.from)).limit(10).select(['-image', '-title', '-description'])
        return res.json({
            artworks: art
        })
    }
    catch (err) {
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "Invalid Request"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.get('/search/:from/:text', async (req, res) => {
    try {
        if (isNaN(req.params.from)) {
            return res.status(400).json({
                error: "Invalid Request"
            })
        }
        const user = await User.findById(req.params.author)
        const art = await Art.find({
            $text: {
                $search: req.params.text
            }
        }).sort({ createdAt: -1 }).skip(Number(req.params.from)).limit(10).select(['-image', '-title', '-description'])
        return res.json({
            artworks: art
        })
    }
    catch (err) {
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "Invalid Request"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.get('/:from/:sort', async (req, res) => {
    try {
        if (isNaN(req.params.from)) {
            return res.status(400).json({
                error: "Invalid Request"
            })
        }
        const sort = req.params.sort === 0 ? {
            createdAt: -1
        } : req.params.sort === 1 ? {
            createdAt: 1
        } : req.params.sort === 2 ? {
            views: 1
        } : req.params.sort === 3 ? {
            views: -1
        } : req.params.sort === 4 ? {
            ratings: -1
        } : {
            ratings: 1
        }
        const art = await Art.find().sort({ createdAt: -1, ...sort }).skip(Number(req.params.from)).limit(10).select(['-image', '-title', '-description'])
        return res.json({
            artworks: art
        })
    }
    catch (err) {
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "Invalid Request"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})


Router.get('/:id', async (req, res) => {
    try {
        const art = await Art.findById(req.params.id);

        if (!art) {
            return res.status(400).json({
                error: "Not found"
            })
        }
        const user = await User.findById(art.user);
        user.balance += process.env.weiAwardedPerView;
        await user.save()
        art.views += 1;
        await art.save()
        return res.json({
            art
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
Router.post('/', [auth, validator([{ name: "title", minLength: 5 }, { name: "description", minLength: 10 }, { name: 'image' }])], async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        const { image, tags } = await uploadArt(req.body.image);
        console.log(tags)
        const art = new Art({
            user: user._id,
            description: req.body.description,
            title: req.body.title,
            keywords: tags,
            image: image.secure_url
        })
        await art.save();
        return (res.json({
            id: art._id
        }))
    }
    catch (err) {
        console.log(err);
        if (err.kind = "ObjectId") {
            return res.status(400).json({
                error: "Not Found"
            })
        }
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.delete('/:id', auth, async (req, res) => {
    try {
        const art = await Art.findById(req.params.id);
        if (!art) {
            return res.status(400).json({
                error: "Not found"
            })
        }
        const user = await User.findById(req.user).select('-password');
        if (user._id.toString() !== art.user.toString()) {
            return res.status(401).json({
                error: "You can only delete your own art work"
            })
        }
        const ratings = await Rating.find({
            art: art._id
        });
        ratings.forEach(async r => {
            await r.delete();
        });
        await art.delete()
        return res.json({
            msg: "done"
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
export default Router;