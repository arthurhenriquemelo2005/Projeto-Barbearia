const express = require("express");
const autenticarUsuario = require("../middleware/authMiddleware");
const { agendar, buscarAgendamentos, cancelarAgendamento } = require("../controllers/agendamentosController");
const { buscarServicos } = require("../controllers/servicosController");

const rotasCliente = express.Router();

rotasCliente.get("/servicos", autenticarUsuario, buscarServicos);
rotasCliente.get("/agendamentos", autenticarUsuario, buscarAgendamentos);
rotasCliente.post("/agendar", autenticarUsuario, agendar);
rotasCliente.patch("/:agendamento_id/cancelar", autenticarUsuario, cancelarAgendamento);

module.exports = rotasCliente;