import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { buscarPokemonPeloNome } from '../../servicos/servicoPokemon';
import type { IDetalhesPokemon } from '../../tipos/pokemon.tipos';
import estilos from './PaginaDetalhes.module.scss';

//Funções Auxiliares
const getStatColor = (stat: number): string => {
  if (stat < 50) return 'danger';
  if (stat < 90) return 'warning';
  return 'success';
};
const getStatPercentage = (stat: number): number => {
  const maxStat = 200; 
  return (stat / maxStat) * 100;
};
const traduzirStat = (statName: string): string => {
  switch (statName) {
    case 'hp': return 'HP';
    case 'attack': return 'Ataque';
    case 'defense': return 'Defesa';
    case 'special-attack': return 'Ataque Especial';
    case 'special-defense': return 'Defesa Especial';
    case 'speed': return 'Velocidade';
    default: return statName;
  }
};


function PaginaDetalhes() {
  const { nome } = useParams<{ nome: string }>();
  const navigate = useNavigate(); 
  const [pokemon, setPokemon] = useState<IDetalhesPokemon | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  //useEffect
  useEffect(() => {
    if (!nome) return; 
    const carregarDetalhes = async () => {
      try {
        setCarregando(true);
        setErro(null);
        setPokemon(null);
        const dados = await buscarPokemonPeloNome(nome);
        setPokemon(dados);
      } catch (err) {
        console.error("Falha ao buscar detalhes:", err);
        setErro(`Pokémon "${nome}" não encontrado.`);
      } finally {
        setCarregando(false);
      }
    };
    carregarDetalhes();
  }, [nome]); 

  //loading
  if (carregando) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }
  
  if (erro) {
    return (
      <div className="text-center">
        <h1 className="mb-3">{erro}</h1>
        <button 
          onClick={() => navigate(-1)} 
          className={`btn ${estilos.botaoVoltar}`}
        >
          Voltar para a Lista
        </button>
      </div>
    );
  }
  
  if (!pokemon) {
    return <p>Nenhum Pokémon para exibir.</p>;
  }

  const urlDaImagemPixelada = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  const tipoPrincipal = pokemon.types[0]?.type.name || 'normal';
  const classeDeFundoBola = `bg-card-type-${tipoPrincipal}`; 

  return (
    <div>
      <button 
        onClick={() => navigate(-1)} 
        className={`btn ${estilos.botaoVoltar} mb-3`}
      >
        &laquo; Voltar para a Lista
      </button>
      <div className="card shadow-lg">
        <div className="card-header text-center p-3">
          <h1 className="text-capitalize mb-0">
            {pokemon.name}
            <span className="text-muted ms-2">
              #{`${pokemon.id}`.padStart(3, '0')}
            </span>
          </h1>
        </div>

        <div className="row g-0">
          <div className={`col-lg-5 d-flex align-items-center justify-content-center p-3 ${estilos.areaImagem}`}>
            <div className={`${estilos.bolaColorida} ${classeDeFundoBola}`}></div>
            <img 
              src={urlDaImagemPixelada} 
              className={`img-fluid ${estilos.imagemPokemon}`} 
              alt={pokemon.name}
              style={{ 
                width: '250px',
                height: '250px',
                objectFit: 'contain',
              }}
            />
          </div>

          <div className="col-lg-7">
            <div className="card-body p-4"> 
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5 className="card-title">Informações</h5>
                  <p className="card-text mb-0">
                    <strong>Altura:</strong> {pokemon.height / 10} m
                  </p>
                  <p className="card-text">
                    <strong>Peso:</strong> {pokemon.weight / 10} kg
                  </p>
                </div>
                <div className="col-md-6">
                  <h5 className="card-title">Tipos</h5>
                  <div>
                    {pokemon.types.map(({ type }) => (
                      <span 
                        key={type.name} 
                        className={`badge badge-pokemon-type me-2 bg-type-${type.name}`}
                      >
                        {type.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h5 className="card-title mt-4">Base de status</h5>
              {pokemon.stats.map(({ stat, base_stat }) => (
                <div key={stat.name} className="mb-2">
                  <strong className="text-capitalize">{traduzirStat(stat.name)}:</strong>
                  <div className="progress" style={{ height: '20px' }}>
                    <div 
                      className={`progress-bar progress-bar-striped bg-${getStatColor(base_stat)}`}
                      role="progressbar" 
                      style={{ width: `${getStatPercentage(base_stat)}%` }}
                      aria-valuenow={base_stat}
                      aria-valuemin={0}
                      aria-valuemax={200}
                    >
                      {base_stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaginaDetalhes;