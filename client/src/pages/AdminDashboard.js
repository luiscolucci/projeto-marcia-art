import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom"; // Importações limpas
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Adicionado estado de erro

  // Função para buscar as obras da API
  const fetchObras = async () => {
    try {
      const response = await fetch(
        "https://marcia-art-api-923894154927.southamerica-east1.run.app/api/obras"
      );
      if (!response.ok) {
        throw new Error(
          "Falha ao buscar obras. Verifique a conexão com a API."
        );
      }
      const data = await response.json();
      setObras(data);
    } catch (error) {
      console.error("Erro ao buscar obras:", error);
      setError(error.message); // Guarda a mensagem de erro
    } finally {
      setLoading(false);
    }
  };

  // Busca as obras quando a página carrega
  useEffect(() => {
    fetchObras();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Tem certeza que deseja deletar esta obra? Esta ação não pode ser desfeita."
      )
    ) {
      try {
        await fetch(
          `https://marcia-art-api-923894154927.southamerica-east1.run.app/api/obras/${id}`,
          {
            method: "DELETE",
          }
        );
        setObras(obras.filter((obra) => obra.id !== id));
      } catch (error) {
        console.error("Erro ao deletar obra:", error);
        alert("Falha ao deletar a obra.");
      }
    }
  };

  if (loading) {
    return <div>Carregando painel...</div>;
  }

  // Se houver um erro na busca dos dados, mostra a mensagem
  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Painel de Controle</h1>
        <div className="header-buttons">
          {/* BOTÃO ADICIONADO AQUI */}
          <Link to="/admin/nova-obra">
            <button className="add-obra-button">Adicionar Nova Obra</button>
          </Link>
          <button onClick={handleLogout} className="logout-button">
            Sair (Logout)
          </button>
        </div>
      </div>

      <table className="obras-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {obras.length > 0 ? (
            obras.map((obra) => (
              <tr key={obra.id}>
                <td>{obra.title}</td>
                <td>{obra.description}</td>
                <td>
                  {/* Adicionada verificação para evitar erro se o preço não existir */}
                  {obra.price
                    ? obra.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : "N/A"}
                </td>
                <td>{obra.isAvailable ? "Disponível" : "Vendido"}</td>
                <td className="action-buttons">
                  <Link to={`/admin/editar/${obra.id}`}>
                    <button className="edit-button">Editar</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(obra.id)}
                    className="delete-button"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Nenhuma obra encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
