const express = require("express");
const pool = require("../banco/conexao");
const { SQL } = require("../helpers/querys");
const gerarToken = require("../middleware/token");
const { compararHash } = require("../helpers/hash");

const rotas = express.Router();

rotas.post("/", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Informe email e senha"
            });
        }

        const { rows } = await pool.query(SQL.Login, [email]);

        if (!rows[0]) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos"
            });
        }

        const usuario = rows[0];

        const validarSenha = await compararHash(
            senha,
            usuario.senha
        );

        if (!validarSenha) {
            return res.status(401).json({
                mensagem: "Email ou senha inválidos"
            });
        }

        res.json({
            mensagem: "Login realizado",
            token: gerarToken(usuario.id)
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
});

module.exports = rotas;