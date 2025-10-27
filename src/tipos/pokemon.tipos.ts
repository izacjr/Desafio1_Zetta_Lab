/* Interface para recursos da API 
 * que vêm com um nome e uma URL.*/
export interface IRecursoNomeadoAPI {
  name: string;
  url: string;
}

//Resposta da API para a lista principal de Pokémon
export interface IRespostaListaPokemon {
  count: number;
  results: IRecursoNomeadoAPI[];
}

//Resposta da API para a lista de tipos
export interface IRespostaListaTipos {
  count: number;
  results: IRecursoNomeadoAPI[]; //Reutilizando a interface
}

// Estrutura de um Pokémon DENTRO da resposta de um tipo
export interface IPokemonPorTipo {
  pokemon: IRecursoNomeadoAPI; //Contém 'name' e 'url'
}

//Resposta da API para a busca por um tipo específico
export interface IRespostaDetalhesTipo {
  id: number;
  name: string;
  pokemon: IPokemonPorTipo[]; //A lista de pokémon desse tipo
}

//Interface para os detalhes de um Pokémon
export interface IDetalhesPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string; //URL da imagem oficial
      }
    }
  };
  types: {
    type: IRecursoNomeadoAPI;
  }[];
  stats: {
    base_stat: number;
    stat: IRecursoNomeadoAPI;
  }[];
}
