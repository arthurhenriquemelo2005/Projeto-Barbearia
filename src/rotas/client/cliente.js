const { agendar, buscarAgendamentos, concluirAgendamento, cancelarAgendamento } = require("../../controllers/client/agendamentosController");
const express = require("express");

const rotasCliente = express.Router();

rotasCliente.post("/agendar", agendar); 
rotasCliente.post("/agendamentos", buscarAgendamentos);
rotasCliente.post("/concluirAgendamento", concluirAgendamento);
rotasCliente.post("/cancelarAgendamento", cancelarAgendamento);

module.exports = rotasCliente;