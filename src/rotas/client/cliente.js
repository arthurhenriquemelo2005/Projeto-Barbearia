const { agendar, buscarAgendamentos } = require("../../controllers/client/agendamentosController");
const express = require("express");

const rotasCliente = express.Router();

rotasCliente.post("/agendar", agendar); 
rotasCliente.post("/agendamentos", buscarAgendamentos);

module.exports = rotasCliente;