const pool = require("../../banco/conexao");
const SQL = require("../../banco/querys");

function verificarTipo(tipo) {
    return tipo === "CLIENTE" ? true : false;
}

const agendar = async (req, res) => {
    try {
        const usuario_id = req.usuario.id;
        const { servico_id, data, hora } = req.body;

        await pool.query(
            SQL.agendar,
            [usuario_id, servico_id, data, hora]
        );

        res.status(201).json({
            mensagem: "Agendamento realizado com sucesso"
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
};

const buscarAgendamentos = async (req, res) => {
    try {
        const usuario_id = req.usuario.id;

        if (req.usuario.tipo !== "CLIENTE") {
            return res.status(403).json({
                mensagem: "Apenas Clientes"
            });
        }

        const { rows } = await pool.query(
            SQL.buscarAgendamentosCliente,
            [usuario_id]
        );

        if (rows.length === 0) {
            return res.status(200).json({
                mensagem: "Você não possui agendamentos"
            });
        }

        res.status(200).json({
            mensagem: "Agendamentos encontrados com sucesso",
            dados: rows
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
};

const concluirAgendamento = async (req, res) => {
    try {
        const usuario_id = req.usuario.id;
        const { agendamento_id } = req.params;

        const resultado = await pool.query(
            SQL.concluirAgendamento,
            [usuario_id, agendamento_id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Agendamento não encontrado, já concluído ou não pertence a você"
            });
        }

        res.status(200).json({
            mensagem: "Agendamento concluído com sucesso"
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro interno no servidor"
        });
    }
};

const cancelarAgendamento = async (req, res) => {
    try {
        const usuario_id = req.usuario.id;
        const { agendamento_id } = req.params;

        const resultado = await pool.query(
            SQL.cancelarAgendamento,
            [usuario_id, agendamento_id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensagem: "Agendamento não encontrado, já cancelado ou já concluido"
            });
        }

        res.status(200).json({
            mensagem: "Agendamento cancelado com sucesso"
        });

    } catch (erro) {
        console.error(erro);

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