module.exports = app => {
  const alunos = require("../controllers/Aluno.controller.js");

  // Cria um novo aluno
  app.post("/alunos", alunos.create);

  // Pega todos os alunos na tabela
  app.get("/alunos", alunos.findAll);

  // Pega só um aluno da tabela
  app.get("/alunos/:ra", alunos.findOne);

  // Altera todos os alunos da tabela
  app.put("/alunos/:ra", alunos.update);

  // Deleta os alunos com ra
  app.delete("/alunos/:ra", alunos.delete);

  // Deleta todas as disciplinas
  app.delete("/alunos", alunos.deleteAll);
};