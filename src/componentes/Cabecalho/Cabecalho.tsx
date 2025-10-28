import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const CHAVE_STORAGE = 'pokedexOffset';

const Cabecalho: React.FC = () => {
  const location = useLocation();
  const handleInicioClick = () => {
    if (location.pathname === '/') {
      sessionStorage.removeItem(CHAVE_STORAGE);
    }
  };
  const pokeballImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand d-flex align-items-center">
          <img
            src={pokeballImageUrl}
            alt="Pokébola"
            style={{
              width: '28px',
              height: '28px',
              marginRight: '0.5rem'
            }}
          />
          Pokédex
        </span>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/"
                end
                onClick={handleInicioClick}
              >
                Início
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tipos">
                Tipos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Cabecalho;