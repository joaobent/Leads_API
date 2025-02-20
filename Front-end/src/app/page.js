'use client'
import { useState } from "react";
import styles from "./page.module.css"; 

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handletelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}${value.length > 7 ? "-" + value.slice(7, 11) : ""}`;
    }
    setTelefone(value); // Atualiza o estado com o valor formatado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");
    setSucesso("");

    const cadastroData = {
      nome: nome,
      email: email,
      telefone: telefone,
    };

    try {
      const res = await fetch("http://localhost:9000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cadastroData),
      });

      if (!res.ok) {
        throw new Error("Erro ao cadastrar usuário!");
      }

      const contentType = res.headers.get("Content-Type");

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setSucesso("Usuário cadastrado com sucesso!");
        console.log("Usuário cadastrado", data);
      } else {
        setSucesso("Usuário cadastrado com sucesso");
      }

      setNome("");
      setEmail("");
      setTelefone("");
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.h2}>Cadastro</h2>

        {erro && <p className={styles.error}>{erro}</p>}
        {sucesso && <p className={styles.success}>{sucesso}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="SeuEmail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            placeholder="(xx) xxxxx-xxxx"
            value={telefone}
            onChange={handletelefoneChange} // Usando a função formatada
            required
            className={styles.input}
          />
        </div>

        <button 
          type="submit" 
          className={styles.button} 
          disabled={carregando}
        >
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
