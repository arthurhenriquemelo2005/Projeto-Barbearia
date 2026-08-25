const bcrypt = require("bcrypt");

function gerarHash(senha) {
    return bcrypt.hash(senha, 10);
}

function compararHash(senha, senhaHasheada) {
    return bcrypt.compare(senha, senhaHasheada);
}

module.exports = { gerarHash, compararHash };