import { useState, useEffect } from 'react';
import { buscarListaDeTipos, buscarPokemonsPorTipo } from '../../servicos/servicoPokemon';
import type { IRecursoNomeadoAPI, IPokemonPorTipo } from '../../tipos/pokemon.tipos'; 
import { CartaoPokemon } from '../../componentes/CartaoPokemon/CartaoPokemon';

function PaginaTipos() {
  const [listaDeTipos, setListaDeTipos] = useState<IRecursoNomeadoAPI[]>([]);
  const [pokemonsFiltrados, setPokemonsFiltrados] = useState<IPokemonPorTipo[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState<string | null>(null);
  const [carregandoTipos, setCarregandoTipos] = useState(true);
  const [carregandoPokemons, setCarregandoPokemons] = useState(false);

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
  }, []); 

  useEffect(() => {
    if (!tipoSelecionado) return; 
    const carregarPokemonsPorTipo = async () => {
      try {
        setCarregandoPokemons(true);
        setPokemonsFiltrados([]); 
        const dados = await buscarPokemonsPorTipo(tipoSelecionado);
        setPokemonsFiltrados(dados.pokemon);
      } catch (erro) {
        console.error("Falha ao buscar Pokémon por tipo", erro);
      } finally {
        setCarregandoPokemons(false);
      }
    };
    carregarPokemonsPorTipo();
  }, [tipoSelecionado]); 

  return (
    <div>
      
      <div className="bg-white rounded-3 shadow-sm p-4">

        {/* 1. Título (dentro) */}
        <h2 className="mb-3 text-center titulo-pokedex">Pokédex - Pesquisa por Tipos</h2> 
        <h4 className="text-muted text-center mb-3">
          Deseja apenas ver os Pokémons pelo seu tipo? Aqui é o lugar!
        </h4>
        <p className="text-muted text-center mb-3">
          Clique em um tipo abaixo para poder ver todos os Pokémon correspondentes.
        </p>
        {carregandoTipos ? ( 
          <div className="text-center">
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Carregando tipos...</span>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4"> 
            {/* Adicionado mb-4 para separar dos cartões */}
            {listaDeTipos.map((tipo) => (
              <button 
                key={tipo.name}
                className={`btn badge-pokemon-type text-capitalize ${ 
                  tipoSelecionado === tipo.name 
                    ? `bg-type-${tipo.name}` 
                    : 'btn-outline-secondary' 
                }`}
                onClick={() => setTipoSelecionado(tipo.name)}
                disabled={carregandoPokemons}
              >
                {tipo.name}
              </button>
            ))}
          </div>
        )}

        <hr className="my-4" /> 

        {carregandoPokemons && ( 
           <div className="d-flex justify-content-center mt-4"> {/* Adicionado mt-4 */}
             <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
               <span className="visually-hidden">Carregando Pokémon...</span>
             </div>
           </div>
         )}
  
        {!carregandoPokemons && pokemonsFiltrados.length > 0 && (
          <div className="row g-3 justify-content-center"> 
            {pokemonsFiltrados.map((item) => (
              <div 
                key={item.pokemon.name} 
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <CartaoPokemon 
                  nome={item.pokemon.name} 
                  url={item.pokemon.url} 
                />
              </div>
            ))}
          </div>
        )}
  
        {!carregandoPokemons && tipoSelecionado && pokemonsFiltrados.length === 0 && (
            <p className="text-center mt-4">Nenhum Pokémon encontrado para o tipo "{tipoSelecionado}".</p>
        )}

      </div> 

    </div>
  );
}

export default PaginaTipos;