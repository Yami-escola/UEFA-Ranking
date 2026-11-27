import { useState } from 'react';

export default function Formulario({ onAdd }) {
  const [nome, setNome] = useState('');
  const [pais, setPais] = useState('Espanha');
  const [titulos, setTitulos] = useState('');
  const [posicao, setPosicao] = useState('');
  const [erro, setErro] = useState('');
  const [aEnviar, setAEnviar] = useState(false);

  async function submeter(e) {
    e.preventDefault();
    setAEnviar(true);
    setErro('');

    try {
      const res = await fetch('http://localhost:3000/api/equipas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, pais, titulos, posicao })
      });

      if (res.status === 201) {
        const nova = await res.json();
        onAdd(nova); 
        setNome(''); setTitulos(''); setPosicao(''); 
      } else {
        const dados = await res.json();
        setErro(dados.error); 
      }
    } catch (err) {
      setErro('Erro de ligação ao servidor.');
    }
    setAEnviar(false);
  }

  return (
    <div style={{ border: '1px solid #000', padding: '10px', marginBottom: '20px' }}>
      <h3>Adicionar</h3>
      <form onSubmit={submeter}>
        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
        
        <select value={pais} onChange={e => setPais(e.target.value)}>
          <option value="Espanha">Espanha</option>
          <option value="Itália">Itália</option>
          <option value="Alemanha">Alemanha</option>
          <option value="Inglaterra">Inglaterra</option>
        </select>

        <input type="number" placeholder="Títulos" value={titulos} onChange={e => setTitulos(e.target.value)} min="0" required />
        <input type="number" placeholder="Posição" value={posicao} onChange={e => setPosicao(e.target.value)} min="1" required />
        
        <button type="submit" disabled={aEnviar}>
          {aEnviar ? 'A enviar...' : 'Adicionar'}
        </button>
      </form>
      
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
    </div>
  );
}