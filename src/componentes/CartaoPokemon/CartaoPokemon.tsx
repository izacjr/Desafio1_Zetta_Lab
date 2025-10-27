import { Link } from 'react-router-dom';
import estilos from './CartaoPokemon.module.scss'; //SASS Module

interface ICartaoPokemonProps {
  nome: string;
  url: string;
}

export function CartaoPokemon({ nome, url }: ICartaoPokemonProps) {

  const extrairIdDaUrl = (url: string) => {
    const partes = url.split('/').filter(Boolean); //Removendo barras vazias
    return partes[partes.length - 1]; //Pega o último item (o ID)
  };

  const id = extrairIdDaUrl(url);
  const urlDaImagem = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${nome}`} className={`card text-decoration-none ${estilos.cartaoPokemon}`}>
      <img src={urlDaImagem} className="card-img-top" alt={nome} />
      <div className="card-body">
        <h5 className="card-title text-capitalize text-center">{nome}</h5>
      </div>
    </Link>
  );
}