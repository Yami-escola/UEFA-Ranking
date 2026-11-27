function Item({ equipa, onDelete }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
      <div>
        <h3>{equipa.nome}</h3>
        <p>País: {equipa.pais} | Títulos: {equipa.titulos} | Posição: {equipa.posicao}</p>
      </div>
      <button onClick={() => onDelete(equipa.id)}>Apagar</button>
    </div>
  );
}

export default Item;