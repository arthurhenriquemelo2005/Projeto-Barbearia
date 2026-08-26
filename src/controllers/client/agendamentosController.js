const pool = require("../../banco/conexao");
const SQL = require("../../banco/querys");

const agendar = async (req, res) => {
    try {
        const { id, servico_id, data, hora } = req.body;

        await pool.query(SQL.agendar, [id, servico_id, data, hora]);

        res.status(201).json({
            mensagem: "Agendamento realizado com sucesso"
        });

    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
};

const buscarAgendamentos = async (req, res) => {
    try {
        const { usuario_id } = req.body;

        const { rows } = await pool.query(SQL.buscarAgendamentosCliente, [usuario_id]);

        if (rows.lenght == 0) {
            return res.status(200).json({
                mensagem: "Você não possui agendamentos"
            });
        }

        const agendamentos = rows;

        res.status(200).json({
            mensagem: "Agendamentos encontrados com sucesso",
            dados: agendamentos
        });

    } catch (erro) {
        console.log(erro)
        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
};

const concluirAgendamento = async (req, res) => {
    try {
        const { usuario_id, agendamento_id } = req.body;

        await pool.query(SQL.concluirAgendamento, [usuario_id, agendamento_id]);

        res.status(201).json({
            mensagem: "Agendamento concluido com sucesso"
        })
    } catch (erro) {
        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
}

const cancelarAgendamento = async (req, res) => {
    try {
        const {usuario_id, agendamento_id} = req.body;

        await pool.query(SQL.cancelarAgendamento, [usuario_id, agendamento_id]);

        res.status(201).json({
            mensagem: "Agendamento cancelado com sucesso"
        });
    } catch (erro) {
        console.log(erro);
        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
};

module.exports = {
    agendar,
    buscarAgendamentos,
    concluirAgendamento,
    cancelarAgendamento
};