module.exports = app => {
  const customers = require("../controllers/Matricula.controller.js");

  module.exports = app => {
    const disciplina = require("../controllers/Disciplina.controller.js");

    // Cria uma nova matricula
    app.post("/matricula", matricula.create);

    // Busca todas as matriculas
    app.get("/matricula", matricula.findAll);

    //Busca uma matricula com id especifico
    app.get("/matricula/:matriculaRA", matricula.findOne);

    // Altera uma matricula com id especifico
    app.put("/matricula/:matriculaRA", matricula.update);

    // Deleta uma matricula com id especifico
    app.delete("/matricula/:matriculaRA", matricula.delete);

    // Deleta todas as matriculas
    app.delete("/matricula", matricula.deleteAll);
  };
};