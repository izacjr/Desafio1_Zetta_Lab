import api from './api';
import { 
  IRespostaListaPokemon, 
  IRespostaListaTipos, 
  IRespostaDetalhesTipo, 
  IDetalhesPokemon 
} from '../tipos/pokemon.tipos'; 

 //Busca uma lista paginada de Pokémon.

export const buscarListaPokemon = async (limite: number = 24, offset: number = 0) => {
  const resposta = await api.get<IRespostaListaPokemon>(
    `pokemon?limit=${limite}&offset=${offset}`
  );
  return resposta.data;
};

 //Busca os detalhes completos de um Pokémon pelo nome.

export const buscarPokemonPeloNome = async (nome: string) => {
  const resposta = await api.get<IDetalhesPokemon>(`pokemon/${nome}`);
  return resposta.data;
};

 //Busca a lista de todos os tipos de Pokémon disponíveis.

export const buscarListaDeTipos = async () => {
  const resposta = await api.get<IRespostaListaTipos>('type'); 
  return resposta.data;
}

///Busca todos os Pokémon que pertencem a um tipo específico.

export const buscarPokemonsPorTipo = async (nomeDoTipo: string) => {
  const resposta = await api.get<IRespostaDetalhesTipo>(`type/${nomeDoTipo}`);
  return resposta.data;
}