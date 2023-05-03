const jwt = require("jsonwebtoken");
const promisify = require('util').promisify;

const sign = promisify(jwt.sign).bind(jwt);
const verify = promisify(jwt.verify).bind(jwt);
const generateToken = async (payload, secret, tokenLife) => {
    try {
        return await sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: tokenLife,
        });
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};
const verifyToken = async (token, secret) => {
    try {
        return await verify(token, secret);
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
};
module.exports = {
    generateToken,
    verifyToken,
};
