const express = require("express");
const banco = require("../banco/conexao");

const rota = express.Router();

rota.post("/", (req, res) => {

    const {
        usuario_id,
        servico_id,
        data,
        hora
    } = req.body;

    if (!usuario_id || !servico_id || !data || !hora) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos para realizar o agendamento"
        });
    }

    const sql = `
        INSERT INTO agendamentos (usuario_id, servico_id, data, hora)
        VALUES (?, ?, ?, ?)
    `;

    banco.query(
        sql,
        [usuario_id, servico_id, data, hora],
        (erro, resultado) => {

            if (erro) {
                console.error(
                    "Erro ao criar o agendamento:",
                    erro.message
                );

                return res.status(500).json({
                    mensagem: "Erro ao criar o agendamento"
                });
            }

            res.status(201).json({
                mensagem: "Agendamento realizado com sucesso",
                id: resultado.insertId
            });
        }
    );
});

module.exports = rota;