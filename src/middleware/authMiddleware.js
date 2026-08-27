const autenticarToken = require("../jwt/autenticarToken")

const autenticarUsuario = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                mensagem: "Token não informado"
            });
        }

        const token = authHeader.split(" ")[1];

        const usuario = autenticarToken(token);

        req.usuario = usuario;

        next();

    } catch (erro) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado"
        });
    }
};

module.exports = autenticarUsuario;