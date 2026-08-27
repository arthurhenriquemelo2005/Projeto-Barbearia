const express = require("express");
const cors = require("cors");
require("dotenv").config();

//Variaveis das rotas
const rotasAuth = require("./src/rotas/auth");
const rotasCliente = require("./src/rotas/cliente");
const rotasBarbeiro = require("./src/rotas/barbeiro")


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Rotas Autenticacação e criação de contas
app.use("/auth", rotasAuth);
// Rotas de clientes.
app.use("/cliente", rotasCliente);
// Rotas do barbeiro
app.use("/barber", rotasBarbeiro);



app.get("/",(req,res) => {
    res.json({
        mensagem: "Backend tá funcionando"
        
    })
})

app.listen(PORT, () => {
    console.log(`Servidor funcionando!`);
});
