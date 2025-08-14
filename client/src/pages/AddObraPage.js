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

    // FormData é necessário para enviar arquivos
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("isAvailable", isAvailable);
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        "https://marcia-art-api-923894154927.southamerica-east1.run.app/api/obras",
        {
          method: "POST",
          body: formData, // Ao usar FormData, o navegador define o 'Content-Type' correto
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao criar a obra.");
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagem da Obra</label>
          <input type="file" id="image" onChange={handleFileChange} required />
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
