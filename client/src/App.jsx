import { useState, useEffect } from 'react';
import Item from './Item';
import './App.css';

function App() {
  const [equipas, setEquipas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [paisFiltro, setPaisFiltro] = useState('todos');

  useEffect(() => {
    fetch('http://localhost:3000/api/equipas')
      .then((res) => res.json())
      .then((data) => {
        setEquipas(data);
        setLoading(false);
      })
      .catch((err) => {
        setErro('Erro ao carregar equipas');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>A carregar...</p>;
  if (erro) return <p>{erro}</p>;

  // os países do select: os que existem nas equipas, sem repetir
  const paises = [...new Set(equipas.map((equipa) => equipa.pais))];

  // primeiro filtra pelo país, depois pelo nome
  let equipasVisiveis = equipas;
  if (paisFiltro !== 'todos') {
    equipasVisiveis = equipasVisiveis.filter((equipa) => equipa.pais === paisFiltro);
  }
  equipasVisiveis = equipasVisiveis.filter((equipa) =>
    equipa.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="app">
      <h1>UEFA Ranking</h1>
      <div className="controlos">
        <input
          className="pesquisa"
          type="text"
          placeholder="Pesquisar equipa..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <select value={paisFiltro} onChange={(e) => setPaisFiltro(e.target.value)}>
          <option value="todos">Todos os países</option>
          {paises.map((pais) => (
            <option key={pais} value={pais}>
              {pais}
            </option>
          ))}
        </select>
      </div>
      <p className="contagem">
        A mostrar {equipasVisiveis.length} de {equipas.length}
      </p>
      {equipasVisiveis.length === 0 && <p>Nenhuma equipa encontrada.</p>}
      {equipasVisiveis.map((equipa) => (
        <Item key={equipa.id} equipa={equipa} />
      ))}
    </div>
  );
}

export default App;