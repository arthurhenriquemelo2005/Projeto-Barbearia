const SQL = {
    Login: `
        SELECT id, senha
        FROM usuarios
        WHERE email = $1
    `,
    registrar: `
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)
    `,
    verificarHorario: `
        SELECT *
        FROM agendamentos
        WHERE data = ?
        AND hora = ?
        AND status = 'AGENDADO'
    `,
      verificarHorario: `
        SELECT id
        FROM agendamentos
        WHERE data = ?
        AND hora = ?
        AND status = 'AGENDADO'
    `,

    criarAgendamento: `
        INSERT INTO agendamentos
        (usuario_id, servico_id, data, hora)
        VALUES (?, ?, ?, ?)
    `,

    cancelarAgendamento: `
        UPDATE agendamentos
        SET status = 'CANCELADO'
        WHERE id = ?
        AND status = 'AGENDADO'
    `,

    buscarAgendamentos: `
        SELECT
            a.id,
            u.nome AS cliente,
            s.nome AS servico,
            s.preco,
            a.data,
            a.hora,
            a.status
        FROM agendamentos a
        INNER JOIN usuarios u
            ON a.usuario_id = u.id
        INNER JOIN servicos s
            ON a.servico_id = s.id
        ORDER BY a.data, a.hora
    `,

    concluirAgendamento: `
        UPDATE agendamentos
        SET status = 'CONCLUIDO'
        WHERE id = ?
        AND status = 'AGENDADO'
    `
};

module.exports = SQL;