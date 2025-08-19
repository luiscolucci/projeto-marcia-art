import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddObraPage.css";

const AddObraPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError("Por favor, selecione um arquivo de imagem.");
      return;
    }
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("isAvailable", isAvailable);
    formData.append("image", imageFile);

    // --- ALTERAÇÃO 1: URL da API dinâmica ---
    // Define a URL correta dependendo se o ambiente é de produção ou desenvolvimento
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? "https://marcia-art-api-923894154927.southamerica-east1.run.app/api/obras"
        : "http://localhost:3001/api/obras";

    try {
      const response = await fetch(apiUrl, { // Usando a variável apiUrl
        method: "POST",
        body: formData,
      });
      
      // --- ALTERAÇÃO 2: Melhor tratamento de erros ---
      if (!response.ok) {
        // Tenta extrair uma mensagem de erro específica do backend
        const errorData = await response.json().catch(() => ({ message: "Falha ao criar a obra. O servidor não respondeu com um erro detalhado." }));
        throw new Error(errorData.message);
      }

      alert("Obra adicionada com sucesso!");
      navigate("/admin");
    } catch (err) {
      setError(err.message);
      console.error("Erro ao criar obra:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-obra-page-container">
      <h1>Adicionar Nova Obra</h1>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Preço (ex: 1250.00)</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            step="0.01" // Adicionado para permitir casas decimais
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagem da Obra</label>
          <input type="file" id="image" onChange={handleFileChange} required accept="image/*" /> {/* Adicionado para aceitar apenas imagens */}
        </div>
        <div className="form-group-checkbox">
          <label htmlFor="isAvailable">Disponível para venda</label>
          <input
            type="checkbox"
            id="isAvailable"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-actions">
          <button type="submit" className="save-button" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Nova Obra"}
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

export default AddObraPage;