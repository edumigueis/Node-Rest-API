module.exports = app => {
  const disciplina = require("../controllers/Disciplina.controller.js");

  // Cria uma nova disciplina
  app.post("/disciplina", disciplina.create);

  // Busca todas as disciplinas
  app.get("/disciplina", disciplina.findAll);

  //Busca uma disciplina com id especifico
  app.get("/disciplina/:disciplinaCOD", disciplina.findOne);

  // Altera uma disciplina com id especifico
  app.put("/disciplina/:disciplinaCOD", disciplina.update);

  // Deleta uma disciplina com id especifico
  app.delete("/disciplina/:disciplinaCOD", disciplina.delete);

  // Deleta todas as disciplinas
  app.delete("/disciplina", disciplina.deleteAll);
};