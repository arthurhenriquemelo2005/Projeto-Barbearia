const express = require("express");
const { login, register } = require("../controllers/authController")

const rotasUsuario = express.Router();

rotasUsuario.post("/login", login);
rotasUsuario.post("/register", register);

module.exports = rotasUsuario;