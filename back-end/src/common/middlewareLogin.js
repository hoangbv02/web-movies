const { ACCESS_TOKEN_REQUIRED, ACCESS_DEINED_LOGIN } = require("./messageList");
const authMethod = require("./auth");
const { ACCESS_TOKEN_SECRET } = require("./config");
const isAuth = async (req, res, next) => {
    const accessTokenFromHeader = req.headers.authorization;
    if (!accessTokenFromHeader) {
        return res.status(400).send(ACCESS_TOKEN_REQUIRED);
    }
    const verify = await authMethod.verifyToken(
        accessTokenFromHeader,
        ACCESS_TOKEN_SECRET
    );
    if (!verify) {
        return res.status(400).send(ACCESS_DEINED_LOGIN);
    }
    const username = verify.username;
    req.username = username;
    return next();
};
module.exports = {
    isAuth,
};
