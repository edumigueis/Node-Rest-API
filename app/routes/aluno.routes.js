module.exports = app => {
  const alunos = require("../controllers/Aluno.controller.js");

  // Cria um novo aluno
  app.post("/alunos", alunos.create);

  // Pega todos os alunos na tabela
  app.get("/alunos", alunos.findAll);

  // Pega só um aluno da tabela
  app.get("/alunos/:alunoRA", alunos.findOne);

  // Pega todos os alunos da tabela
  app.put("/alunos/:alunoRA", alunos.update);

  // Deleta os alunos com ra
  app.delete("/alunos/:alunoRA", alunos.delete);

  // Deleta todas as disciplinas
  app.delete("/alunos", alunos.deleteAll);
};