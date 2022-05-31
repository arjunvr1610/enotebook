const jwt = require("jsonwebtoken");
const JWT_SECRET = "jaibajrangbalithododushmankinali";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({error: 'Please use a valid auth-token'});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).send({error: 'Please use a valid auth-token'});
    }
}

module.exports = fetchuser;