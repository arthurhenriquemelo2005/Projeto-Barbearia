const SQL = {
    Login: `
        SELECT id, senha
        FROM usuarios
        WHERE email = $1
    `
};