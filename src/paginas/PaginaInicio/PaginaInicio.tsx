import { useState, useEffect } from 'react';
import { buscarListaPokemon } from '../../servicos/servicoPokemon';
import type { IRecursoNomeadoAPI } from '../../tipos/pokemon.tipos';
import { CartaoPokemon } from '../../componentes/CartaoPokemon/CartaoPokemon';
import estilos from './PaginaInicio.module.scss';

const LIMITE_POR_PAGINA = 20;
const CHAVE_STORAGE = 'pokedexOffset';

function PaginaInicio() {
  const [listaPokemon, setListaPokemon] = useState<IRecursoNomeadoAPI[]>([]);
  const [offset, setOffset] = useState(() => {
    const offsetGuardado = sessionStorage.getItem(CHAVE_STORAGE);
    const offsetNumero = offsetGuardado ? parseInt(offsetGuardado, 10) : 0;
    return !isNaN(offsetNumero) ? offsetNumero : 0;
  });
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (isNaN(offset)) {
      console.error("Offset inválido, resetando para 0.");
      setOffset(0);
      return;
    }
    const carregarPokemon = async () => {
      try {
        setCarregando(true);
        const dados = await buscarListaPokemon(LIMITE_POR_PAGINA, offset);
        setListaPokemon(dados.results);
        setTotalPokemon(dados.count);
        sessionStorage.setItem(CHAVE_STORAGE, offset.toString());
      } catch (erro) {
        console.error("Falha ao buscar lista de Pokémon", erro);
      } finally {
        setCarregando(false);
      }
    };
    carregarPokemon();
  }, [offset]);

  const irParaProxima = () => {
    if (!isNaN(offset) && offset + LIMITE_POR_PAGINA < totalPokemon) {
      setOffset(offset + LIMITE_POR_PAGINA);
    }
  };
  const irParaAnterior = () => {
    if (!isNaN(offset) && offset - LIMITE_POR_PAGINA >= 0) {
      setOffset(offset - LIMITE_POR_PAGINA);
    }
  };

  const paginaAtual = !isNaN(offset) ? (offset / LIMITE_POR_PAGINA) + 1 : 1;
  const totalPaginas = Math.ceil(totalPokemon / LIMITE_POR_PAGINA);
  const estaDesabilitadoAnterior = offset === 0 || carregando;
  const estaDesabilitadoProxima = offset + LIMITE_POR_PAGINA >= totalPokemon || carregando;

  return (
    <div>

      <div className="mb-4 p-4 rounded-3 bg-white shadow">

        <h1 className="titulo-pokedex text-center mb-4">Pokédex</h1>
        <div className="d-flex justify-content-between align-items-center mb-4 p-2 rounded bg-light">
          <button
            className={`btn ${estilos.botaoPaginacao}`}
            onClick={irParaAnterior}
            disabled={estaDesabilitadoAnterior}
          >
            &laquo; Anterior
          </button>
          <span className="fw-bold mx-3">
            Página {paginaAtual} {totalPaginas > 0 && !isNaN(totalPaginas) && `de ${totalPaginas}`}
          </span>
          <button
            className={`btn ${estilos.botaoPaginacao}`}
            onClick={irParaProxima}
            disabled={estaDesabilitadoProxima}
          >
            Próxima &raquo;
          </button>
        </div>
        {carregando ? (
          <div className="d-flex justify-content-center mt-4">
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
    </div>
  );
}

export default PaginaInicio;