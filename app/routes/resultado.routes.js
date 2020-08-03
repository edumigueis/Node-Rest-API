module.exports = app => {
  const customers = require("../controllers/Resultado.controller.js");

  // Cria um novo resultado
  app.post("/resultado", resultado.create);

  // Busca todos os resultados
  app.get("/resultado", resultado.findAll);

  //Busca um resultado com id especifico
  app.get("/resultado/:resultadoRA", resultado.findOne);

  // Altera um resultado com id especifico
  app.put("/resultado/:resultadoRA", resultado.update);

  // Deleta um resultado com id especifico
  app.delete("/resultado/:resultadoRA", resultado.delete);

  // Deleta todos os resultados
  app.delete("/resultado", resultado.deleteAll);
};