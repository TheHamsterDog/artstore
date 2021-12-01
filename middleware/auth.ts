const jwt = require('jsonwebtoken')
const middleware = async (req, res, next) => {
    try {
        const token = req.headers["x-auth-token"];
        if (!token) {
            return res.status(401).json({
                error: "You need to be signed in to access this route!"
            })
        }
        const decoded = await jwt.verify(token, process.env.jwtSecret)
        req.user = decoded.id;
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            error: "Invalid token!"
        })
    }
    next()
}

export default middleware