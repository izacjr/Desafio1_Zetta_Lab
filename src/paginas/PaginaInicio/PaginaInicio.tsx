import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; 
import { buscarListaPokemon } from '../../servicos/servicoPokemon';
import type { IRecursoNomeadoAPI } from '../../tipos/pokemon.tipos';
import { CartaoPokemon } from '../../componentes/CartaoPokemon/CartaoPokemon';

const LIMITE_POR_PAGINA = 24; //Quantos Pokémon carregar por vez

function PaginaInicio() {
  const [listaPokemon, setListaPokemon] = useState<IRecursoNomeadoAPI[]>([]);
  const [offset, setOffset] = useState(0); 
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [carregando, setCarregando] = useState(true);

  //Pega a 'location' da rota atual
  const location = useLocation();

  //buscar os Pokémon toda vez que o 'offset' mudar
  useEffect(() => {
    const carregarPokemon = async () => {
      try {
        setCarregando(true);
        const dados = await buscarListaPokemon(LIMITE_POR_PAGINA, offset);
        setListaPokemon(dados.results);
        setTotalPokemon(dados.count);
      } catch (erro) {
        console.error("Falha ao buscar lista de Pokémon", erro);
      } finally {
        setCarregando(false);
      }
    };
    carregarPokemon();
  }, [offset]); //Dependência: 'offset'

  //Reseta para a página 1 se o usuário clicar em <Link>
  useEffect(() => {
    //location.key muda toda vez que um <Link> é clicado.
    //Se o offset não for 0, voltamos para a página 1.
    if (offset !== 0) {
      setOffset(0);
    }
  }, [location.key]); //Dependência: a 'key' da rota

  //Funções de Paginação
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

  //Cálculos para exibição
  const paginaAtual = (offset / LIMITE_POR_PAGINA) + 1;
  const totalPaginas = Math.ceil(totalPokemon / LIMITE_POR_PAGINA);
  
  //Variáveis de estado para desabilitar botões
  const estaDesabilitadoAnterior = offset === 0 || carregando;
  const estaDesabilitadoProxima = offset + LIMITE_POR_PAGINA >= totalPokemon || carregando;

  return (
    <div>
      <h1 className="mb-4 text-center">Minha Pokédex</h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4 p-2 rounded bg-light shadow-sm">
        <button 
          className="btn btn-primary" 
          onClick={irParaAnterior}
          disabled={estaDesabilitadoAnterior} //Usa a variável
        
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
        //Grid de cartões
        <div className="row g-3">
          {listaPokemon.map((pokemon) => (
            <div 
              key={pokemon.name} 
              //Classes de responsividade do Bootstrap
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

