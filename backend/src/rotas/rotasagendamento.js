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

    // Verifica se todos os dados foram enviados
    if (!usuario_id || !servico_id || !data || !hora) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos para agendar"
        });
    }

    // Primeiro verifica se o horário já está ocupado
    const verificarHorario = `
        SELECT *
        FROM agendamentos
        WHERE data = ?
        AND hora = ?
        AND status = 'AGENDADO'
    `;

    banco.query(
        verificarHorario,
        [data, hora],
        (erro, resultados) => {

            if (erro) {
                console.error(
                    "Erro ao verificar horário:",
                    erro.message
                );

                return res.status(500).json({
                    mensagem: "Erro ao verificar horário"
                });
            }

            // Se encontrou um agendamento, o horário está ocupado
            if (resultados.length > 0) {
                return res.status(409).json({
                    mensagem: "Esse horário já está ocupado"
                });
            }

            // Se tiver livre, cria o agendamento
            const sql = `
                INSERT INTO agendamentos
                (usuario_id, servico_id, data, hora)
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
        }
    );
});

module.exports = rota;