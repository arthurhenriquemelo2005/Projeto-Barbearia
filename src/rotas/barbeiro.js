const express = require("express");
const autenticarUsuario = require("../middleware/authMiddleware");
const { buscarTodosAgendamentos, concluirAgendamento } = require("../controllers/agendamentosController");
const { buscarFaturamento } = require("../controllers/financeiroController")
const { buscarServicos } = require("../controllers/servicosController");

const rotasBarbeiro = express.Router();

rotasBarbeiro.get("/agendamentos", autenticarUsuario, buscarTodosAgendamentos);
rotasBarbeiro.get("/faturamento", autenticarUsuario, buscarFaturamento);
rotasBarbeiro.get("/servicos", autenticarUsuario, buscarServicos);

rotasBarbeiro.patch("/:agendamento_id/concluirAgendamento", autenticarUsuario, concluirAgendamento);

module.exports = rotasBarbeiro;