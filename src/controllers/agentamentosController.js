const { SQL } = require("../banco/querys");


    const {
        usuario_id,
        servico_id,
        data,
        hora
    } = req.body;

    // Verifica se todos os dados foram enviados
    if (!usuario_id || !servico_id || !data || !hora) {
        return res.status(400).json({
            mensagem: "Envie todos os dados!"
        });
    }

    // Primeiro verifica se o horário já está ocupado

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