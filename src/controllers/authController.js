const pool = require("../banco/conexao");
const SQL = require("../banco/querys");
const gerarToken = require("../jwt/gerarToken");
const { gerarHash, compararHash } = require("../helpers/hash");


const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                mensagem: "Informe todos os campos"
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

        res.status(200).json({
            mensagem: "Login realizado com sucesso",
            token: gerarToken({ 
                id: usuario.id,
                tipo: usuario.tipo
            })
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
};

const register = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: "Informe todos os campos"
            })
        }

        const senhaHash = await gerarHash(senha);

        const { rows } = await pool.query(SQL.registrar, [nome, email, senhaHash]);

        res.status(201).json({
            mensagem: "Cadastro realizado com sucesso"
        });

    } catch (erro) {
        console.error(erro);

        if (erro.code === "23505") {
            return res.status(409).json({
                mensagem: "Este e-mail já está cadastrado"
            });
        }

        res.status(500).json({
            mensagem: "Erro interno no servidor"
        })
    }
};

module.exports = {
    login,
    register
};