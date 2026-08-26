const { agendar, buscarAgendamentos, concluirAgendamento } = require("../../controllers/client/agendamentosController");
const express = require("express");

const rotasCliente = express.Router();

rotasCliente.post("/agendar", agendar); 
rotasCliente.post("/agendamentos", buscarAgendamentos);
rotasCliente.post("/concluirAgendamento", concluirAgendamento);

module.exports = rotasCliente;