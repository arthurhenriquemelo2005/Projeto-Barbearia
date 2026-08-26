const express = require("express");
const banco = require("../../banco/conexao");

const rotas = express.Router();

rotas.get("/", (req, res) => {
    
    const sql = "SELECT * FROM servicos";

    banco.query(sql, (erro, resultados) => {
        
        if(erro){
            console.error("Erro em buscar os serviços", erro.message);

            return res.status(500).json({
                mensagem: "Erro ao buscar serviços"
            })
        }

        res.json(resultados)
    });
})

module.exports = rotas;