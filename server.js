const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Variaveis das rotas
const rotasUsuario = require("./src/rotas/usuario");
const rotasacesso = require("./src/rotas/rotasacesso");
const rotasservicos = require("./src/rotas/rotasservicos");
const rotasagendamento = require("./src/rotas/agendamentos");
const rotasfaturamento = require("./src/rotas/faturamento");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());


app.use("/users", rotasUsuario);
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
    console.log(`Host: http://localhost:${PORT}`);
});
