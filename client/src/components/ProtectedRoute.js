import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged é um "ouvinte" do Firebase que nos diz
    // em tempo real se o usuário está logado ou não.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Limpa o "ouvinte" quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  // Enquanto verifica o status de login, mostra uma mensagem de carregamento
  if (loading) {
    return <div>Verificando autenticação...</div>;
  }

  // Se, após a verificação, não houver usuário, redireciona para a página de login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Se houver um usuário logado, mostra o conteúdo da página protegida
  return children;
};

export default ProtectedRoute;
