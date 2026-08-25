const SQL = {
    Login: `
        SELECT id, senha
        FROM usuarios
        WHERE email = $1
    `,
    verificarHorario: `
        SELECT *
        FROM agendamentos
        WHERE data = ?
        AND hora = ?
        AND status = 'AGENDADO'
    `,
    
};