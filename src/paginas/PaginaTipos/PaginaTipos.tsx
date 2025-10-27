import { useState, useEffect } from 'react';
// Importa nossas funções e tipos em português
import { buscarListaDeTipos, buscarPokemonsPorTipo } from '../../servicos/servicoPokemon';
import { IRecursoNomeadoAPI, IPokemonPorTipo } from '../../tipos/pokemon.tipos';
import { CartaoPokemon } from '../../componentes/CartaoPokemon/CartaoPokemon';
// Importe seu componente Carregando/Carregando.tsx

function PaginaTipos() {
  // Estados em português
  const [listaDeTipos, setListaDeTipos] = useState<IRecursoNomeadoAPI[]>([]);
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState<IPokemonPorTipo[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);
  const [carregandoTipos, setCarregandoTipos] = useState(true);
  const [carregandoPokemons, setCarregandoPokemons] = useState(false);

  // Hook para carregar a lista de tipos (botões) UMA VEZ
  useEffect(() => {
    const carregarTipos = async () => {
      try {
        setCarregandoTipos(true);
        const dados = await buscarListaDeTipos();
        setListaDeTipos(dados.results);
      } catch (erro) {
        console.error("Falha ao buscar lista de tipos", erro);
      } finally {
        setCarregandoTipos(false);
      }
    };
    carregarTipos();
  }, []); // Array vazio = roda só na montagem

  // Hook para buscar Pokémon QUANDO 'tipoSelecionado' mudar
  useEffect(() => {
    if (!tipoSelecionado) return; // Não faz nada se nenhum tipo estiver selecionado

    const carregarPokemonsPorTipo = async () => {
      try {
        setCarregandoPokemons(true);
        setPokemonsFiltrados([]); // Limpa a lista antiga
        const dados = await buscarPokemonsPorTipo(tipoSelecionado);
        setPokemonsFiltrados(dados.pokemon);
      } catch (erro) {
        console.error("Falha ao buscar Pokémon por tipo", erro);
      } finally {
        setCarregandoPokemons(false);
      }
    };

    carregarPokemonsPorTipo();
  }, [tipoSelecionado]); // Dependência = 'tipoSelecionado'

  return (
    <div>
      <h2 className="mb-4">Filtrar por Tipo</h2>

      {/* 1. Seção dos Botões de Tipo */}
      {carregandoTipos ? ( <p>Carregando tipos...</p> ) : (
        <div className="d-flex flex-wrap gap-2 mb-4">
          {listaDeTipos.map((tipo) => (
            <button 
              key={tipo.name}
              className={`btn text-capitalize ${tipoSelecionado === tipo.name ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setTipoSelecionado(tipo.name)}
              disabled={carregandoPokemons}
            >
              {tipo.name}
            </button>
          ))}
        </div>
      )}

      {/* 2. Seção da Lista de Pokémon Filtrados */}
      <hr />

      {carregandoPokemons && ( <p>Carregando Pokémon...</p> )}

      {!carregandoPokemons && pokemonsFiltrados.length > 0 && (
        <div className="row g-3">
          {pokemonsFiltrados.map((item) => (
            <div 
              key={item.pokemon.name} 
              // Requisitos de responsividade do Bootstrap
              className="col-12 col-md-4 col-lg-3"
            >
              <CartaoPokemon 
                nome={item.pokemon.name} 
                url={item.pokemon.url} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaginaTipos;