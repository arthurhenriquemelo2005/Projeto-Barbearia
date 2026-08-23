const express = require("express");

const rotas = express.Router();

rotas.get("/admin", (req, res) => {

    const tipo = req.headers.tipo;

    if (tipo !== "ADMIN") {
        return res.status(403).json({
            mensagem: "Acesso negado"
        });
    }

    res.json({
        mensagem: "Bem vindo ao painel do administrador"
    });
});

rotas.get("/clientes", (req, res) => {

    const tipo = req.headers.tipo;

    if (tipo !== "CLIENTE") {
        return res.status(403).json({
            mensagem: "Acesso negado"
        });
    }

    res.json({
        mensagem: "Bem vindo a área de cliente"
    });
});

module.exports = rotas;