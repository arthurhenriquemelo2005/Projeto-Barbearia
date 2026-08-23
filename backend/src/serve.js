const express = require("express");
const cors = require("cors");

//Variaveis das rotas
const banco = require("./banco/conexao")
const rotasusuario = require("./rotas/rotasusuarios");
const rotaslogin = require("./rotas/rotaslogin");
const rotasacesso = require("./rotas/rotasacesso");
const rotasservicos = require("./rotas/rotasservicos");
const rotasagendamento = require("./rotas/rotasagendamento");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/usuarios",rotasusuario);
app.use("/login", rotaslogin);
app.use("/acesso", rotasacesso);
app.use("/servicos", rotasservicos);
app.use("/agendamentos", rotasagendamento);

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

app.get ("/agendamentos", (req,res) => {
    const sql = "SELECT * FROM agendamentos";
    
    banco.query(sql,(erro, resultados) => {
        if(erro){
            console.error("Erro ao buscar agendamentos", erro.message);
            return res.status(500).json({erro: "Erro em buscar agendamentos no banco"});
        }
        res.json(resultados);
    })
})
app.listen(3000, () =>  {
    console.log("Servidor tá rodando na porta 3000 em http://localhost:3000");
})