const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Variaveis das rotas
const rotasAuth = require("./src/rotas/auth");
const rotasCliente = require("./src/rotas/client/cliente");
//const rotasacesso = require("./src/rotas/rotasacesso");
//const rotasservicos = require("./src/rotas/rotasservicos");
//const rotasfaturamento = require("./src/rotas/faturamento");
//const rotasagendamento = require("./src/rotas/agendamentos");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Rotas Autenticacação e criação de contas
app.use("/auth", rotasAuth);

// Rotas de clientes.
app.use("/cliente", rotasCliente);

//app.use("/acesso", rotasacesso);
//app.use("/servicos", rotasservicos);
//app.use("/agendamentos", rotasagendamento);
//app.use("/faturamento", rotasfaturamento)


app.get("/",(req,res) => {
    res.json({
        mensagem: "Backend tá funcionando"
        
    })
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando!`);
    console.log(`Host: http://localhost:${PORT}`);
});
