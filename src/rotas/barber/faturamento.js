const express = require("express");
const banco = require("../../banco/conexao");

const rota = express.Router();

rota.get("/", (req, res) => {
    const sql = `
    SELECT SUM(s.preco) AS faturamento
        FROM agendamentos a
        INNER JOIN servicos s
            ON a.servico_id = s.id
        WHERE a.status = 'CONCLUIDO'
        `;
        
    banco.query(sql, (erro, resultado) => {

        if(erro){
            console.error("Erro ao buscar faturamento", erro.message);

            return res.status(500).json({
                mensagem: "Erro ao buscar faturamento"
            })
        }

        res.json({
            faturamento: resultado[0].faturamento || 0
        });
    }); 
});

module.exports = rota;