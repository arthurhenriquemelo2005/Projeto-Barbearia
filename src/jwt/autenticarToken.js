const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

function autenticarToken(token) {
    try {
        const dados = jwt.verify(token, secretKey);

        return {
            id: dados.id,
            tipo: dados.tipo
        };

    } catch (erro) {
        throw new Error("Token inválido ou expirado");
    }
}

module.exports = autenticarToken;