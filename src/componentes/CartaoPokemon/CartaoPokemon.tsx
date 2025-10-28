import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import estilos from './CartaoPokemon.module.scss';
import { buscarPokemonPeloNome } from '../../servicos/servicoPokemon';
import type { IDetalhesPokemon } from '../../tipos/pokemon.tipos';

interface ICartaoPokemonProps {
  nome: string;
  url: string;
}

export function CartaoPokemon({ nome }: ICartaoPokemonProps) {
  const [detalhes, setDetalhes] = useState<IDetalhesPokemon | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDetalhesDoCartao = async () => {
      try {
        setCarregando(true); 
        const dados = await buscarPokemonPeloNome(nome);
        setDetalhes(dados);
      } catch (erro) {
        console.error(`Falha ao buscar detalhes para ${nome}:`, erro);
      } finally {
        setCarregando(false);
      }
    };
    
    carregarDetalhesDoCartao();
  }, [nome]); 


  if (carregando || !detalhes) {
    return (
      <div className={`text-decoration-none ${estilos.cartaoPokemon}`} aria-hidden="true">
        
        <div className={`${estilos.areaImagem} bg-light`}>
          <div className={`${estilos.bolaColorida} bg-light`}></div>
        </div>
  
        <div className={estilos.corpoCartao}>
          <div className={`${estilos.nomePokemon} text-capitalize placeholder-glow`}>
             <span className="placeholder col-6"></span>
          </div>
          <div className={`${estilos.idPokemon} placeholder-glow`}>
             <span className="placeholder col-3"></span>
          </div>
          <div className={`${estilos.tipoPokemon} placeholder-glow`}>
            Tipo: <span className="placeholder col-4"></span>
          </div>
          <div className="btn btn-primary disabled placeholder col-5" aria-disabled="true"></div>
        </div>
  
      </div>
    );
  }

  const id = `${detalhes.id}`.padStart(3, '0');
  const tipoPrincipal = detalhes.types[0]?.type.name || 'normal';
  const classeDeTexto = `text-type-${tipoPrincipal}`;
  // Classe de fundo clara para a bola
  const classeDeFundoBola = `bg-card-type-${tipoPrincipal}`; 
  const urlDaImagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detalhes.id}.png`;

  return (
    <div className={estilos.cartaoPokemon}>
      
      <div className={estilos.areaImagem}>
        <div className={`${estilos.bolaColorida} ${classeDeFundoBola}`}></div>
        <img 
          src={urlDaImagem} 
          className={estilos.imagemPokemon}
          alt={nome} 
        />
      </div>

      <div className={estilos.corpoCartao}>
        <div className={`text-capitalize ${estilos.nomePokemon}`}>{nome}</div>
        <div className={estilos.idPokemon}>#{id}</div>
        <div className={estilos.tipoPokemon}>
          Tipo: <span className={classeDeTexto}>{tipoPrincipal}</span>
        </div>
        
        <Link to={`/pokemon/${nome}`} className={`btn ${estilos.botaoDetalhes}`}>
          Detalhes
        </Link>
      </div>

    </div>
  );
}