const express = require('express');
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser');
const morgan = require('morgan');
const slowDown = require('express-slow-down');
import connectToDb from './config/db';
import user from './api/user';
import followers from './api/followers'
import art from './api/art'
import ratings from './api/ratings';
import ether from './api/ether'

try {
    app.listen(process.env.PORT || process.env.port, () => {
        console.log(`successfully listening on port ${process.env.PORT || process.env.port}`)
    });
    connectToDb(process.env.mongoURI);
}
catch (err) {
    console.log(`Server Startup failed with error: ${err.message} `)
}

app.use(bodyParser.json({ extended: false, limit: '50mb' }))
app.use((req, res, next) => {
    res.set(`x-powered-by`, "Art Store :)")
    next()
})
app.use(morgan('dev'));
// app.use(slowDown({
//     windowMs: 15 * 60 * 1000,
//     delayAfter: 4000,
//     delayMs: 500
// }))


app.use('/api/user', user);
app.use('/api/follower', followers);
app.use('/api/art', art);
app.use('/api/ether', ether);
app.use('/api/ratings', ratings);
app.use(express.static(__dirname + "/build"))
app.get("*", (req, res) => {
    return res.sendFile(__dirname + "/build/index.html")
})