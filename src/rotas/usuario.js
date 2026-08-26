const express = require("express");
const { login, register } = require("../controllers/usuarioController")

const rotasUsuario = express.Router();

rotasUsuario.post("/login", login);
rotasUsuario.post("/register", register);

module.exports = rotasUsuario;