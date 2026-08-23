const mysql = require("mysql2");

//Criação da conexão com o banco
const conexao = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "admin",
    database: "barbearia"

});

//Validação da conexão com o banco de dados
conexao.connect((error) => {
    if (error) {
        console.error("Erro na conexão com o mysql ", error.message)
        return;
    }
    console.log("Mysql conectou");
    
});

module.exports = conexao;