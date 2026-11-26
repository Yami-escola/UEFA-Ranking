UEFA Ranking
1. Descrição
Aplicação web que permite consultar e gerir uma coleção de equipas de futebol europeias, apresentando informações como o nome, país, títulos conquistados e posição no ranking UEFA.
2. Elemento da equipa
Yami
Evaldo
3. Estrutura de uma equipa
{
  "id": 1,
  "nome": "Real Madrid",
  "pais": "Espanha",
  "titulos": 15,
  "posicao": 1
}
4. API
MétodoRotaFunçãoGET/api/equipasConsultar todas as equipasPOST/api/equipasAdicionar uma equipaDELETE/api/equipas/:idApagar uma equipa
GET /api/equipas
Devolve todas as equipas.
Status: 200.
POST /api/equipas
Recebe nome, país, títulos e posição.
Cria automaticamente um ID.
Devolve a equipa criada.
Status: 201 se tiver sucesso.
Status: 400 se os dados forem inválidos.
DELETE /api/equipas/:id
Recebe o ID da equipa a eliminar.
Elimina a equipa se existir.
Status: 204 se tiver sucesso.
Status: 404 se a equipa não existir.
5. Responsabilidades
Yami: servidor, armazenamento dos dados e funcionalidade de adicionar equipas.
Evaldo: frontend, apresentação das equipas e funcionalidade de pesquisa, filtragem e eliminação.