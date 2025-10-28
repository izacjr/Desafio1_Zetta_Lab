# Minha Pokédex (Desafio Zetta Lab)


Este projeto foi desenvolvido pelo estudante Izac Moreira Souza Junior como parte do desafio técnico inicial do Zetta Lab, cujo objetivo é avaliar a organização do código, boas práticas de desenvolvimento e capacidade de resolução de problemas.

A aplicação consiste numa Pokédex responsiva, que consome dados da [PokeAPI](https://pokeapi.co/) e apresenta visualmente as cartas de Pokémon, incluindo informações detalhadas de cada um e a possibilidade de filtragem por tipo.

## Funcionalidades

* **Listagem de Pokémon:** Exibe os Pokémon de forma paginada.
* **Detalhes do Pokémon:** Mostra informações detalhadas, incluindo estatísticas, tipos e imagem.
* **Filtragem por Tipo:** Permite visualizar Pokémon pertencentes a um tipo específico.
* **Página Sobre:** Apresenta informações sobre o projeto e as tecnologias utilizadas.
* **Design Responsivo:** Adapta-se a diferentes tamanhos de ecrã (mobile, tablet, desktop).
* **Navegação Persistente:** Lembra a página atual ao voltar da página de detalhes.

## Tecnologias e Ferramentas

* **Framework:** React (com Vite)
* **Linguagem:** TypeScript
* **Estilização:** SASS/SCSS e Bootstrap 5+
* **Requisições API:** Axios
* **Roteamento:** React Router DOM
* **Controlo de versão:** Git
* **API pública:** PokeAPI

## Estrutura e Implementação

O projeto foi desenvolvido com foco em componentização, reutilização e clareza de código.

* O menu (`Cabecalho`) e o rodapé (`Rodape`) foram implementados como componentes independentes.
* Foram criadas quatro rotas principais:
    * `/` (Home): listagem geral das cartas Pokémon.
    * `/pokemon/:nome` (Detalhes): exibição de informações específicas de cada carta.
    * `/tipos` (Filtro por tipo): listagem dinâmica de cartas conforme o tipo selecionado.
    * `/sobre` (Sobre): informações sobre o projeto.
* O layout é totalmente responsivo, seguindo os breakpoints do Bootstrap.
* O código utiliza nomes de componentes, ficheiros e variáveis em português para clareza no contexto do desafio.

## Objetivo do Desafio

O desafio teve como propósito demonstrar:

* A capacidade de consumir e manipular dados de APIs REST (JSON).
* O domínio em estruturar projetos front-end modernos com React e TypeScript.
* O uso adequado de estilização com SASS e Bootstrap.
* A implementação de layout responsivo.
* O uso adequado de versionamento de código com Git, utilizando commits descritivos e bem fragmentados.
* A criatividade e autonomia na definição de layout, cores e organização visual da aplicação.

## Como Executar o Projeto

### Pré-requisitos

* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* [npm](https://www.npmjs.com/) caso não venha no Node
* [Git](https://git-scm.com/)

### Instalação

1.  Clone o repositório 
    ```bash
    git clone https://github.com/izacjr/Desafio1_Zetta_Lab.git minha-pokedex
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd minha-pokedex
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Execução

1.  Inicie o servidor de desenvolvimento Vite:
    ```bash
    npm run dev
    ```

2.  Abra o seu navegador e aceda a `http://localhost:3000` (ou a porta indicada no terminal).
