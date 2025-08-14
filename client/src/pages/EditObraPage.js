import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditObraPage.css"; // Vamos usar o estilo que já criamos e adicionar mais

const EditObraPage = () => {
  // Hooks do React Router para pegar o ID da URL e para navegar
  const { obraId } = useParams();
  const navigate = useNavigate();

  // Estado para armazenar os dados do formulário
  const [obraData, setObraData] = useState({
    title: "",
    description: "",
    price: 0,
    isAvailable: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Busca os dados da obra específica quando a página carrega
  useEffect(() => {
    const fetchObraData = async () => {
      try {
        const response = await fetch(
          `https://marcia-art-api-923894154927.southamerica-east1.run.app/api/obras`
        ); // Busca TODAS as obras
        if (!response.ok) throw new Error("Falha ao buscar dados");
        const todasObras = await response.json();
        const obraEspecifica = todasObras.find((o) => o.id === obraId); // Encontra a obra pelo ID

        if (obraEspecifica) {
          setObraData(obraEspecifica);
        } else {
          throw new Error("Obra não encontrada");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchObraData();
  }, [obraId]); // Roda o efeito novamente se o obraId mudar

  // 2. Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setObraData((prevState) => ({
      ...prevState,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  // 3. Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `https://marcia-art-api-923894154927.southamerica-east1.run.app//api/obras/${obraId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obraData), // Envia os dados atualizados
        }
      );

      if (!response.ok) throw new Error("Falha ao atualizar a obra");

      alert("Obra atualizada com sucesso!");
      navigate("/admin"); // Redireciona de volta para o painel de admin
    } catch (err) {
      setError(err.message);
      console.error("Erro ao atualizar:", err);
    }
  };

  if (loading) return <div>Carregando dados da obra...</div>;

  return (
    <div className="edit-obra-page-container">
      <h1>Editar Obra</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={obraData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            value={obraData.description}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço (ex: 1250.00)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={obraData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group-checkbox">
          <label htmlFor="isAvailable">Disponível para venda</label>
          <input
            type="checkbox"
            id="isAvailable"
            name="isAvailable"
            checked={obraData.isAvailable}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="save-button">
            Salvar Alterações
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="cancel-button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditObraPage;
