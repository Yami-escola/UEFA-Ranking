function Item({ equipa }) {
  // as 3 primeiras posições ficam com a bola dourada
  const classePosicao = equipa.posicao <= 3 ? 'posicao top' : 'posicao';

  return (
    <div className="item">
      <div className={classePosicao}>{equipa.posicao}</div>
      <div className="info">
        <h3>{equipa.nome}</h3>
        <p>{equipa.pais}</p>
      </div>
      <div className="titulos">🏆 {equipa.titulos}</div>
    </div>
  );
}

export default Item;