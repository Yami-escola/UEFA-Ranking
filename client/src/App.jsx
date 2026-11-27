import { useState, useEffect } from 'react';
import Item from './Item';
import './App.css';

function App() {
  const [equipas, setEquipas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');
  const [pesquisa, setPesquisa] = useState('');

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
  // só as equipas cujo nome tem o texto da pesquisa (sem ligar a maiúsculas)
  const equipasVisiveis = equipas.filter((equipa) =>
    equipa.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="app">
      <h1>UEFA Ranking</h1>
      <div className="controlos">
      <input
        type="text"
        placeholder="Pesquisar equipa..."
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      </div>
      {equipasVisiveis.length === 0 && <p>Nenhuma equipa encontrada.</p>}
      {equipasVisiveis.map((equipa) => (
        <Item key={equipa.id} equipa={equipa} />
      ))}
    </div>
  );
}

export default App;