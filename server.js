const express = require("express");
const cors = require("cors");

//Variaveis das rotas
const banco = require("./src/banco/conexao")
const rotasusuario = require("./src/rotas/rotasusuarios");
const rotaslogin = require("./src/rotas/rotaslogin");
const rotasacesso = require("./src/rotas/rotasacesso");
const rotasservicos = require("./src/rotas/rotasservicos");
const rotasagendamento = require("./src/rotas/rotasagendamento");
const rotasfaturamento = require("./src/rotas/rotasfaturamento");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios",rotasusuario);
app.use("/login", rotaslogin);
app.use("/acesso", rotasacesso);
app.use("/servicos", rotasservicos);
app.use("/agendamentos", rotasagendamento);
app.use("/faturamento", rotasfaturamento)

app.get("/",(req,res) => {
    res.json({
        mensagem: "Backend tá funcionando"
        
    })
})

app.get("/clientes", (req, res) => {
    const sql = " SELECT * FROM usuarios";

    banco.query(sql, (erro, resultados) => {
        if (erro) {
            console.error("Erro ao buscar clientes:", erro.message);
            return res.status(500).json({ erro: "Erro ao buscar clientes no banco" });
        }
        res.json(resultados);
    });
});



app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
});