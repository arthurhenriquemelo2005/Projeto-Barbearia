const express = require("express");
const autenticarUsuario = require("../middleware/authMiddleware");
const { agendar, buscarAgendamentos, cancelarAgendamento } = require("../controllers/agendamentosController");

const rotasCliente = express.Router();

rotasCliente.post("/agendar", autenticarUsuario, agendar);
rotasCliente.get("/agendamentos", autenticarUsuario, buscarAgendamentos);
rotasCliente.patch("/:agendamento_id/cancelar", autenticarUsuario, cancelarAgendamento);

module.exports = rotasCliente;