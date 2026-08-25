const express = require("express");
const db = require("../banco/conexao");

const rotas = express.Router();

rotas.post("/",(req,res) => {
    const {email,senha} = req.body;

    if(!email || !senha){
        
        return res.status(400).json({
            mensagem:"Informe email e senha"
        });
    }

    const sql = `SELECT * FROM usuarios 
    WHERE email = ?`;

    db.query(sql, [email], (erro, resultado) => {
        if(erro){
            console.error(erro);

            return res.status(500).json({
                mensagem: "Erro no servidor"
            });
        }

        //Verifica o email
        if(resultado.length === 0){
            return res.status(401).json ({
                mensagem: "Email ou a senha tá inválida"
            });
        }

        const usuario = resultado[0];

        //Verifica a senha
        if(senha !== usuario.senha){
            return res.status(401).json({
                mensagem:"Email ou senha inválidos"
            });
        }
        res.json({
            mensagem:"Login realizado com sucesso",
            usuario:{
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        })
    })
})

module.exports = rotas;