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

rota.put("/:id/cancelar", (req, res) => {

    const {id} = req.params;

    const sql = `
    UPDATE agendamentos
    SET status = 'CANCELADO'
    WHERE id = ?
    AND status = 'AGENDADO'
    `;

    banco.query(
        sql,
        [id],
        (erro, resultado) => {

            if(erro){
                console.error("Erro em cancelar o agendamento", erro.message);

                return res.status(500).json({
                    mensagem: "Erro ao cancelar o agendamento"
                });
            }

            if(resultado.affectedRows === 0){
                return res.status(404).json({
                    mensagem: "Agendamento não encontrado ou já foi cancelado"
                });
            }

            res.json({
                mensagem: "Agendamento cancelado com sucesso"
            })
        }
    );
})

rota.get("/", (req, res) => {

    const sql = `
    SELECT  
            a.id,
            u.nome AS cliente,
            s.nome AS servico,
            s.preco,
            a.data,
            a.hora,
            a.status
        FROM agendamentos a
        INNER JOIN usuarios u
            ON a.usuario_id = u.id
        INNER JOIN servicos s
            ON a.servico_id = s.id
        ORDER BY a.data, a.hora
    `;
    
    banco.query (sql, (erro, resultado) => {

        if(erro){
            console.error("Erro em buscar agendamentos:", erro.message);
            return res.status(500).json({
                mensagem: "Erro ao buscar agendamentos"
            });
        }

        res.json(resultado)
    })
});

rota.put("/:id/concluir", (req, res) => {

    const {id} = req.params;

    const sql = `
        UPDATE agendamentos
        SET status = 'CONCLUIDO'
        WHERE id = ?
        AND status = 'AGENDADO'
    `;

    banco.query(
        sql,
        [id],
        (erro, resultado) =>{
            
            if(erro){
                console.error("Erro ao concluir o atendimento:", erro.message);

                return res.status(500).json({
                    mensagem: "Erro ao concluir o atendimento"
                });
            }

            if(resultado.affectedRows === 0){
                return res.status(404).json({
                mensagem: "Agendamento não encontrado ou ele não está agendado"});
            }

            res.json({
                mensagem: "Atendimento concluido com sucesso"
            });
        }
    );
});

module.exports = rota;