const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = pool;
//Criação da conexão com o banco
/*const pool = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "admin",
    database: "barbearia"

});*/

//Validação da conexão com o banco de dados
/*conexao.connect((error) => {
    if (error) {
        console.error("Erro na conexão com o mysql ", error.message)
        return;
    }
    console.log("Mysql conectou");
    
});

module.exports = conexao;*/