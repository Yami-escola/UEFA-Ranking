import { useState, useEffect } from 'react';
import Item from './Item';
import Formulario from './Formulario';

function App() {
  const [equipas, setEquipas] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
  const [filtroPais, setFiltroPais] = useState('Todos');

  useEffect(() => {
    fetch('http://localhost:3000/api/equipas')
      .then((res) => res.json())
      .then((data) => setEquipas(data));
  }, []);

  // Feature A: Adicionar à lista
  function handleAdd(novaEquipa) {
    setEquipas([...equipas, novaEquipa]);
  }

  // Feature B: Apagar
  async function handleDelete(id) {
    if (!window.confirm('Tens a certeza que queres apagar?')) return;

    const res = await fetch(`http://localhost:3000/api/equipas/${id}`, { method: 'DELETE' });

    if (res.status === 204) {
      // Sucesso: remove da lista
      setEquipas(equipas.filter(e => e.id !== id));
    } else if (res.status === 404) {
      alert('Erro 404: Esta equipa já foi apagada.');
      setEquipas(equipas.filter(e => e.id !== id)); 
    }
  }

  // Feature B: Filtro e Pesquisa
  const filtradas = equipas.filter(e => {
    const matchNome = e.nome.toLowerCase().includes(pesquisa.toLowerCase());
    const matchPais = filtroPais === 'Todos' || e.pais === filtroPais;
    return matchNome && matchPais;
  });

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>UEFA Ranking</h1>
      
      <Formulario onAdd={handleAdd} />

      <h3>Explorar</h3>
      <input 
        type="text" 
        placeholder="Pesquisar por nome..." 
        value={pesquisa} 
        onChange={e => setPesquisa(e.target.value)} 
      />
      <select value={filtroPais} onChange={e => setFiltroPais(e.target.value)}>
        <option value="Todos">Todos</option>
        <option value="Espanha">Espanha</option>
        <option value="Itália">Itália</option>
        <option value="Alemanha">Alemanha</option>
        <option value="Inglaterra">Inglaterra</option>
      </select>

      <p>A mostrar {filtradas.length} de {equipas.length}</p>

      {filtradas.map((equipa) => (
        <Item key={equipa.id} equipa={equipa} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default App;