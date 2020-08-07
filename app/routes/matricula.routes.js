module.exports = app => {
  const matricula = require("../controllers/Matricula.controller.js");

  // Cria uma nova matricula
  app.post("/matricula", matricula.create);

  // Busca todas as matriculas
  app.get("/matricula", matricula.findAll);

  //Busca uma matricula com id especifico
  app.get("/matricula/:matriculaRA/:cod", matricula.findOne);

  // Altera uma matricula com id especifico
  app.put("/matricula/:matriculaRA", matricula.update);

  // Deleta uma matricula com id especifico
  app.delete("/matricula/:ra/:cod", matricula.delete);

  // Deleta todas as matriculas
  app.delete("/matricula", matricula.deleteAll);
};