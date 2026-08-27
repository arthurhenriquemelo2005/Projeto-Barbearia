const { agendar, buscarAgendamentos, concluirAgendamento, cancelarAgendamento } = require("../../controllers/client/agendamentosController");
const autenticarUsuario = require("../../middleware/authMiddleware")
const express = require("express");

const rotasCliente = express.Router();

rotasCliente.post("/agendar", autenticarUsuario, agendar); 
rotasCliente.get("/agendamentos", autenticarUsuario, buscarAgendamentos);
rotasCliente.patch("/:agendamento_id/concluirAgendamento",  autenticarUsuario, concluirAgendamento);
rotasCliente.patch("/:agendamento_id/cancelarAgendamento", autenticarUsuario, cancelarAgendamento);

module.exports = rotasCliente;