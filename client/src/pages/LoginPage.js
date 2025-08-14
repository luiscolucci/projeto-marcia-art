import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Importa nossa configuração de autenticação
import { signInWithEmailAndPassword } from "firebase/auth";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para nos permitir redirecionar o usuário

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede que a página recarregue ao enviar o formulário
    setError(""); // Limpa erros anteriores

    try {
      // Tenta fazer o login com o Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Se o login for bem-sucedido, redireciona para o painel de controle
      navigate("/admin");
    } catch (err) {
      // Se o Firebase retornar um erro (ex: senha errada), mostra uma mensagem amigável
      setError("E-mail ou senha inválidos. Por favor, tente novamente.");
      console.error("Erro de login:", err); // Mostra o erro detalhado no console para depuração
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-wrapper">
        <h2>Acesso ao Painel de Controle</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Mostra a mensagem de erro, se houver uma */}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
