const { SQL_servicos } = require("../banco/querys");
const pool = require("../banco/conexao");

const buscarServicos = async (req, res) => {
    try {
        const { rows } = await pool.query(SQL_servicos.servicos);

        if (rows.length === 0) {
            return res.status(200).json({
                mensagem: "Não existem serviços cadastrados",
                dados: []
            });
        }

        res.status(200).json({
            mensagem: "Serviços encontrados com sucesso",
            dados: rows
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar serviços"
        });
    }
};

module.exports = {
    buscarServicos
};