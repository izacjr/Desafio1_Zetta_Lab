import { useState, useEffect } from 'react'; 
//Remove useLocation e useRef
import { buscarListaPokemon } from '../../servicos/servicoPokemon';
import type { IRecursoNomeadoAPI } from '../../tipos/pokemon.tipos';
import { CartaoPokemon } from '../../componentes/CartaoPokemon/CartaoPokemon';

const LIMITE_POR_PAGINA = 3; 
const CHAVE_STORAGE = 'pokedexOffset'; 

function PaginaInicio() {
  const [listaPokemon, setListaPokemon] = useState<IRecursoNomeadoAPI[]>([]);

  //Ler o offset inicial do sessionStorage
  const [offset, setOffset] = useState(() => {
    const offsetGuardado = sessionStorage.getItem(CHAVE_STORAGE);
    return offsetGuardado ? parseInt(offsetGuardado, 10) : 0;
  });

  const [totalPokemon, setTotalPokemon] = useState(0);
  const [carregando, setCarregando] = useState(true);

  //buscar os Pokémon toda vez que o 'offset' mudar
  useEffect(() => {
    const carregarPokemon = async () => {
      try {
        setCarregando(true);
        const dados = await buscarListaPokemon(LIMITE_POR_PAGINA, offset);
        setListaPokemon(dados.results);
        setTotalPokemon(dados.count);
        // Guarda o offset atual no sessionStorage
        sessionStorage.setItem(CHAVE_STORAGE, offset.toString());
      } catch (erro) {
        console.error("Falha ao buscar lista de Pokémon", erro);
      } finally {
        setCarregando(false);
      }
    };
    carregarPokemon();
  }, [offset]); //Dependência: 'offset'

  //Funções de Paginação (sem alterações)
  const irParaProxima = () => {
    if (offset + LIMITE_POR_PAGINA < totalPokemon) {
      setOffset(offset + LIMITE_POR_PAGINA);
    }
  };

  const irParaAnterior = () => {
    if (offset - LIMITE_POR_PAGINA >= 0) {
      setOffset(offset - LIMITE_POR_PAGINA);
    }
  };

  //Cálculos para exibição (sem alterações)
  const paginaAtual = (offset / LIMITE_POR_PAGINA) + 1;
  const totalPaginas = Math.ceil(totalPokemon / LIMITE_POR_PAGINA);
  
  //Variáveis de estado para desabilitar botões (sem alterações)
  const estaDesabilitadoAnterior = offset === 0 || carregando;
  const estaDesabilitadoProxima = offset + LIMITE_POR_PAGINA >= totalPokemon || carregando;

  return (
    <div>
      <h1 className="titulo-pokedex">Minha Pokédex</h1> 
      
      <div className="d-flex justify-content-between align-items-center mb-4 p-2 rounded bg-light shadow-sm">
        <button 
          className="btn btn-primary" 
          onClick={irParaAnterior}
          disabled={estaDesabilitadoAnterior} 
          style={{ cursor: estaDesabilitadoAnterior ? 'not-allowed' : 'pointer' }}
        >
          &laquo; Anterior
        </button>
        <span className="fw-bold">
          Página {paginaAtual} {totalPaginas > 0 && `de ${totalPaginas}`}
        </span>
        <button 
          className="btn btn-primary" 
          onClick={irParaProxima}
          disabled={estaDesabilitadoProxima}
          style={{ cursor: estaDesabilitadoProxima ? 'not-allowed' : 'pointer' }}
        >
          Próxima &raquo;
        </button>
      </div>

      {carregando ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      ) : (
        <div className="row g-3 justify-content-center" >
          {listaPokemon.map((pokemon) => (
            <div 
              key={pokemon.name} 
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <CartaoPokemon nome={pokemon.name} url={pokemon.url} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaginaInicio;