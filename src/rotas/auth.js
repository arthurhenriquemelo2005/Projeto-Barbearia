const express = require("express");
const pool = require("../banco/conexao");
const { login } = require("../controllers/authController")

const rotasAuth = express.Router();

rotasAuth.post("/login", login);
//rotasAuth.post("/cadastro", cadastro);

module.exports = rotasAuth;