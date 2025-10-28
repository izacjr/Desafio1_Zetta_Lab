import React from 'react';

function PaginaSobre() {
  return (
    <div>
      <div className="bg-white rounded-3 shadow-sm p-4">
        <h2 className="mb-4 text-center titulo-pokedex">Sobre o Projeto Pokédex</h2>
        <p>
          Este projeto foi desenvolvido como parte do desafio técnico inicial do Zetta Lab, 
          cujo objetivo é avaliar a organização do código, boas práticas de desenvolvimento e capacidade de resolução de problemas.

A aplicação consiste em uma Pokédex responsiva, que consome dados da PokeAPI e apresenta visualmente as cartas de Pokémon, incluindo informações detalhadas de cada um e a possibilidade de filtragem por tipo.
        </p>

        <h4 className="mt-4 mb-3">Tecnologias Utilizadas:</h4>
        <ul>
          <li><strong>React (com Vite):</strong> Biblioteca principal para a construção da interface do utilizador.</li>
          <li><strong>TypeScript:</strong> Para adicionar tipagem estática e melhorar a robustez do código.</li>
          <li><strong>React Router DOM:</strong> Para gestão das rotas de navegação (Início, Tipos, Detalhes, Sobre).</li>
          <li><strong>Bootstrap 5+:</strong> Framework CSS para layout responsivo e componentes pré-estilizados (adaptado com SASS).</li>
          <li><strong>SASS/SCSS:</strong> Pré-processador CSS para uma estilização mais organizada e poderosa (variáveis, mixins, etc.).</li>
          <li><strong>Axios:</strong> Para realizar as requisições HTTP à API.</li>
          <li><strong>PokeAPI (<code>pokeapi.co</code>):</strong> API pública utilizada como fonte de dados dos Pokémon.</li>
          <li><strong>Git & GitHub:</strong> Para controlo de versão e alojamento do código-fonte.</li>
        </ul>

        <h4 className="mt-4 mb-3">Funcionalidades Principais:</h4>
        <ul>
          <li>Listagem paginada de Pokémon.</li>
          <li>Visualização detalhada de cada Pokémon (estatísticas, tipos, imagem).</li>
          <li>Filtragem de Pokémon por tipo.</li>
          <li>Layout responsivo adaptado a diferentes tamanhos de ecrã.</li>
          <li>Navegação entre páginas preservando o estado da paginação (ao voltar da página de detalhes).</li>
        </ul>

        <p className="mt-4 text-muted text-center">
          Desenvolvido por Izac Moreira Souza Junior como parte do Desafio ZettaLab.
        </p>

      </div>
    </div>
  );
}

export default PaginaSobre;