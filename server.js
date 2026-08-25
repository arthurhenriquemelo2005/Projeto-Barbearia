const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Variaveis das rotas
const rotasusuario = require("./src/rotas/rotasusuarios");
const rotasAuth = require("./src/rotas/auth");
const rotasacesso = require("./src/rotas/rotasacesso");
const rotasservicos = require("./src/rotas/rotasservicos");
const rotasagendamento = require("./src/rotas/agendamentos");
const rotasfaturamento = require("./src/rotas/rotasfaturamento");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios",rotasusuario);
app.use("/auth", rotasAuth);
app.use("/acesso", rotasacesso);
app.use("/servicos", rotasservicos);
app.use("/agendamentos", rotasagendamento);
app.use("/faturamento", rotasfaturamento)

app.get("/",(req,res) => {
    res.json({
        mensagem: "Backend tá funcionando"
        
    })
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando!`);
});

