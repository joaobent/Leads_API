import pool from './conexao.js';

const cadastrarUsuario = async (nome, email, telefone) => {
  const query = 'INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)';
  try {
    const [result] = await pool.execute(query, [nome, email, telefone]);
    return result;
  } catch (err) {
    console.error('Erro ao cadastrar usuário:', err);
    throw err;
  }
};


const mostrarUsuarios = async () => {
  const query = 'SELECT * FROM usuarios';
  try {
    const [result] = await pool.execute(query);
    return result;
  } catch (err) {
    console.error('Erro ao recuperar usuários:', err);
    throw err;
  }
};

export { cadastrarUsuario, mostrarUsuarios };