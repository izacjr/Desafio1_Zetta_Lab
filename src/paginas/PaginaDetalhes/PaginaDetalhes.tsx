import React from 'react';
import { useParams } from 'react-router-dom';

const PaginaDetalhes: React.FC = () => {
  // O hook useParams vai pegar o :nome da URL
  const { nome } = useParams<{ nome: string }>();

  return (
    <div>
      <h1 className="mb-3 text-capitalize">Detalhes do: {nome}</h1>
      <p>Teste.</p>
    </div>
  );
};

export default PaginaDetalhes;
