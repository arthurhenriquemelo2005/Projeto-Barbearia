const banco = require("../banco/conexao");
const SQL = require("../banco/querys");



const buscarAgendamentos = (req, res) => {

    try {
        const { email } = req.body;

        const { rows } = pool.query(SQL.verificarTipoUsuario, [email]);

        const usuario = rows[0];

    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro interno no servidor!"
        });
    }

    banco.query(
        SQL.buscarAgendamentos,
        (erro, resultado) => {

            if (erro) {
                console.error(
                    "Erro em buscar agendamentos:",
                    erro.message
                );

                return res.status(500).json({
                    mensagem: "Erro ao buscar agendamentos"
                });
            }

            res.json(resultado);

        }
    );
};

const criarAgendamento = (req, res) => {

    const {
        usuario_id,
        servico_id,
        data,
        hora
    } = req.body;

    if (!usuario_id || !servico_id || !data || !hora) {
        return res.status(400).json({
            mensagem: "Envie todos os dados!"
        });
    }

    banco.query(
        SQL.verificarHorario,
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

            if (resultados.length > 0) {
                return res.status(409).json({
                    mensagem: "Esse horário já está ocupado"
                });
            }

            banco.query(
                SQL.criarAgendamento,
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
};


const cancelarAgendamento = (req, res) => {

    const { id } = req.params;

    banco.query(
        SQL.cancelarAgendamento,
        [id],
        (erro, resultado) => {

            if (erro) {
                console.error(
                    "Erro em cancelar o agendamento:",
                    erro.message
                );

                return res.status(500).json({
                    mensagem: "Erro ao cancelar o agendamento"
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Agendamento não encontrado ou já foi cancelado"
                });
            }

            res.json({
                mensagem: "Agendamento cancelado com sucesso"
            });

        }
    );
};


const concluirAgendamento = (req, res) => {

    const { id } = req.params;

    banco.query(
        SQL.concluirAgendamento,
        [id],
        (erro, resultado) => {

            if (erro) {
                console.error(
                    "Erro ao concluir o atendimento:",
                    erro.message
                );

                return res.status(500).json({
                    mensagem: "Erro ao concluir o atendimento"
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensagem: "Agendamento não encontrado ou ele não está agendado"
                });
            }

            res.json({
                mensagem: "Atendimento concluído com sucesso"
            });

        }
    );
};


module.exports = {
    criarAgendamento,
    cancelarAgendamento,
    buscarAgendamentos,
    concluirAgendamento
};