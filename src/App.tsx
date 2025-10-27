import { BrowserRouter, Routes, Route } from 'react-router-dom';
//Importa os componentes reutilizáveis
import Cabecalho from './componentes/Cabecalho/Cabecalho';
import Rodape from './componentes/Rodape/Rodape';
//Importa as páginas 
import PaginaInicio from './paginas/PaginaInicio/PaginaInicio';
import PaginaDetalhes from './paginas/PaginaDetalhes/PaginaDetalhes';
import PaginaTipos from './paginas/PaginaTipos/PaginaTipos';
//Aqui vamos criar as rotas das Páginas
function App() {
  return (
    <BrowserRouter>
      <Cabecalho />
      <main className="container my-4" style={{ minHeight: '80vh' }}>
        <Routes> 
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/pokemon/:nome" element={<PaginaDetalhes />} />
          <Route path="/tipos" element={<PaginaTipos />} />
        </Routes>
      </main>

      <Rodape />
    </BrowserRouter>
  );
}

export default App;