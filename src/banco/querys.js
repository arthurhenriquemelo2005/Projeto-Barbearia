const SQL = {
    Login: `
        SELECT senha, email
        FROM usuarios
        WHERE email = $1
    `,
    registrar: `
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)
    `,
    verificarUsuario: `
        SELECT id, tipo
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
      verificarHorario: `
        SELECT id
        FROM agendamentos
        WHERE data = ?
        AND hora = ?
        AND status = 'AGENDADO'
    `,

    agendar: `
        INSERT INTO agendamentos
        (usuario_id, servico_id, data, hora)
        VALUES ($1, $2, $3, $4)
    `,

    cancelarAgendamento: `
        UPDATE agendamentos
        SET status = 'CANCELADO'
        WHERE id = ?
        AND status = 'AGENDADO'
    `,
    buscarAgendamentosCliente: `
        SELECT
        s.nome AS servico,
        s.preco AS preco,
        a.data AS data,
        a.hora AS hora,
        a.status AS status
        FROM agendamentos a
        INNER JOIN usuarios u
            ON a.usuario_id = u.id
        INNER JOIN servicos s
            ON a.servico_id = s.id
        WHERE a.usuario_id = $1
        ORDER BY a.data, a.hora
    `,
    buscarAgendamentosBarbeiro: `
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
        WHERE usuario_id = $1 AND status = 'AGENDADO'
    `

};

module.exports = SQL;