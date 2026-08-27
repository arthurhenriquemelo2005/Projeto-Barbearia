const SQL_servicos = {
    servicos: `
        SELECT * FROM servicos
    `
};

const SQL_auth = {
    Login: `
        SELECT id, senha, tipo, nome
        FROM usuarios
        WHERE email = $1
    `,
    registrar: `
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)
    `
};

const SQL_agendamentos = {
    agendar: `
        INSERT INTO agendamentos
        (usuario_id, servico_id, data, hora)
        VALUES ($1, $2, $3, $4)
    `,

    cancelarAgendamento: `
        UPDATE agendamentos
        SET status = 'CANCELADO'
        WHERE usuario_id = $1
        AND id = $2
        AND status = 'AGENDADO'
    `,
    buscarAgendamentosCliente: `
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY a.data DESC, a.hora DESC, a.id DESC
            ) AS numero,
            a.id AS id,
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
        ORDER BY a.data DESC, a.hora DESC, a.id DESC
    `,
    buscarTodosAgendamentos: `
        SELECT
            ROW_NUMBER() OVER (
                ORDER BY a.data DESC, a.hora DESC, a.id DESC
            ) AS numero,
            COUNT(*) OVER () AS quantidade_agendamentos,
            a.id AS id,
            u.nome AS cliente,
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
        ORDER BY a.data DESC, a.hora DESC, a.id DESC
    `,
    concluirAgendamento: `
        UPDATE agendamentos
        SET status = 'CONCLUIDO'
        WHERE usuario_id = $1
        AND id = $2
        AND status = 'AGENDADO'
    `
};

const SQL_faturamento = {
    buscarFaturamento: `
        SELECT COALESCE(SUM(s.preco), 0) AS faturamento
        FROM agendamentos a
        INNER JOIN servicos s
            ON a.servico_id = s.id
        WHERE a.status = 'CONCLUIDO'
    `
};

module.exports = {
    SQL_auth,
    SQL_agendamentos,
    SQL_servicos,
    SQL_faturamento
};