const express = require("express");
const rotasAgendamentos = express.Router();
/*const {
    criarAgendamento,
    cancelarAgendamento,
    buscarAgendamentos,
    concluirAgendamento
} = require("../controllers/agendamentoController");
const rotasAgendamentos = express.Router();

rotasAgendamentos.post("/", criarAgendamento);

rotasAgendamentos.put("/:id/cancelar", cancelarAgendamento);

rotasAgendamentos.get("/", buscarAgendamentos);

rotasAgendamentos.put("/:id/concluir", concluirAgendamento);

*/
module.exports = rotasAgendamentos;