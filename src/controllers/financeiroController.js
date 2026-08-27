const pool = require("../banco/conexao");
const { SQL_faturamento } = require("../banco/querys");

const buscarFaturamento = async (req, res) => {
    try {
        if (req.usuario.tipo !== "ADMIN") {
            return res.status(403).json({
                mensagem: "Apenas Barbeiros",
                dados: []
            });
        }

        const { rows } = await pool.query(
            SQL_faturamento.buscarFaturamento
        );

        res.status(200).json({
            faturamento: rows[0].faturamento
        });
    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao buscar faturamento"
        });
    }
};

module.exports = {
    buscarFaturamento
};