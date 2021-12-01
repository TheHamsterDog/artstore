const Router = require('express').Router();
const validator = require('oversimplified-express-validator');
const bcrypt = require('bcryptjs');
import { uploadAvatar } from '../config/cloudinary';
const jwt = require('jsonwebtoken')
// const config = require('config');

import User from '../models/user';
import auth from '../middleware/auth';
Router.post('/sign-up', validator([{ name: 'name' }, { name: "userName", minLength: 5 }, { name: "image" }, { name: "password", minLength: 8 }, { name: "ethAddress", minLength: 42, maxLength: 42 }]), async (req, res) => {
    try {
        const exists = await User.findOne({ userName: req.body.userName })
        if (exists) {
            return res.status(400).json({
                error: "There is already a user registered with this username"
            })
        }
        const image = await uploadAvatar(req.body.image);
        console.log(image)
        const salt = await bcrypt.genSalt(process.env.salt);
        const password = await bcrypt.hashSync(req.body.password, salt)
        const user = new User({
            name: req.body.name,
            userName: req.body.userName,
            password,
            description: req.body.description,
            image,
            ethAddress: req.body.ethAddress
        })
        await user.save();
        const data = {
            id: user._id
        }
        const json = await jwt.sign(data, process.env.jwtSecret, { expiresIn: '90d' })
        return res.json({
            token: json,
            user
        })
    }
    catch (err) {
        console.log(err.message)
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.post('/sign-in', validator([{ name: "password" }, { name: "userName", minLength: 5 }]), async (req, res) => {
    try {
        const exists = await User.findOne({ userName: req.body.userName })
        if (!exists) {
            return res.status(400).json({
                error: "No user is registered with this username"
            })
        }
        const comparison = await bcrypt.compare(req.body.password, exists.password);
        if (!comparison) {
            return res.status(400).json({
                error: "Incorrect Credentials"
            })
        }
        const data = {
            id: exists._id
        }
        const json = await jwt.sign(data, process.env.jwtSecret, { expiresIn: '90d' })
        return res.json({
            token: json,
            user: exists
        })
    }
    catch (err) {
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.delete('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password')
        await user.delete()
        return res.json({ msg: "done" });
    }
    catch (err) {
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})
Router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password')
        return res.json({ user });
    }
    catch (err) {
        return res.status(500).json({
            error: "Our services are unavailable at this moment, please try again later!"
        })
    }
})

Router.get('/:id',  async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        return res.json({ user });
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