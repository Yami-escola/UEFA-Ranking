function Item({ equipa }) 
{
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>{equipa.nome}</h3>
      <p>País: {equipa.pais}</p>
      <p>Títulos: {equipa.titulos}</p>
      <p>Posição: {equipa.posicao}</p>
    </div>
  );
}

export default Item;