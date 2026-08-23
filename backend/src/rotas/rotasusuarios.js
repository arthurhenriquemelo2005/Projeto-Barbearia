const express = require("express");
const db = require("../banco/conexao");

const rota = express.Router();

rota.post("/",(req,res) => {

    const {nome, email,senha} = req.body;

    if(!nome || !email || !senha){

        return res.status(400).json({
            mensagem: "Preencha todos os campos"
        });
    }

    const sql = `INSERT INTO USUARIOS (nome,email,senha)
    VALUES (?, ?, ?)`;

    db.query(
        sql,
        [nome,email,senha],
        (erro,resultado) => {
            if (erro){
                console.error(erro);
                
                return res.status(5000).json({
                    mensagem: "Erro ao cadastrar o usuário"
                });
            }

            res.status(201).json({
                mensagem: "Cliente cadastrado com sucesso",
                id: resultado.insertId
            })
        }
    )
})

module.exports = rota;