const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

function gerarToken(payload) {
    return jwt.sign(payload, secretKey, {
        expiresIn: "5h"
    });
}

module.exports = gerarToken;