import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Define a URL da API que será usada
  const API_URL =
    "https://marcia-art-api-923894154927.southamerica-east1.run.app";

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await fetch(`${API_URL}/api/obras`);

        if (!response.ok) {
          throw new Error(`Falha ao buscar dados: ${response.statusText}`);
        }

        const data = await response.json();
        setObras(data);
      } catch (err) {
        console.error("Erro ao buscar obras:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, []); // O array vazio garante que a busca só acontece uma vez

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
        const response = await fetch(`${API_URL}/api/obras/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Falha ao deletar a obra.");
        }
        setObras(obras.filter((obra) => obra.id !== id));
      } catch (err) {
        console.error("Erro ao deletar obra:", err);
        alert(err.message);
      }
    }
  };

  if (loading) {
    return <div className="admin-dashboard">Carregando painel...</div>;
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <h1>Erro ao carregar dados</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Painel de Controle</h1>
        <div className="header-buttons">
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
                Nenhuma obra encontrada no banco de dados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
