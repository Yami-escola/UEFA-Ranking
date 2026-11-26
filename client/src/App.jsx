import { useState, useEffect } from 'react';
import Item from './Item';

function App() {
  const [equipas, setEquipas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

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

  return (
    <div>
      <h1>UEFA Ranking</h1>
      {equipas.map((equipa) => (
        <Item key={equipa.id} equipa={equipa} />
      ))}
    </div>
  );
}

export default App;