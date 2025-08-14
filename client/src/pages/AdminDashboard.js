import React from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redireciona para o login após o logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div style={{ padding: "4rem 2rem" }}>
      <h1>Bem-vindo ao Painel de Controle</h1>
      <p>
        Esta é a área administrativa. Em breve, aqui estarão as ferramentas para
        gerenciar as obras.
      </p>
      <button
        onClick={handleLogout}
        style={{ padding: "10px 20px", fontSize: "1rem", cursor: "pointer" }}
      >
        Sair (Logout)
      </button>
    </div>
  );
};

export default AdminDashboard;
