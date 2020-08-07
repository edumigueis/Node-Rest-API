const Matricula = require("../models/Matricula.model.js");

// Cria e salva uma novo matricula
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio"
    });
  }

  // Cria um Matricula
  const matricula = new Matricula({
    ra: req.body.RA,
    cod: req.body.Cod
  });

  // Salva Matricula no banco de dados
  Matricula.create(matricula, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao criar matricula."
      });
    else res.send(data.recordset);
  });
};

// Pega todos as matriculas do banco de dados
exports.findAll = (req, res) => {
  Matricula.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao buscar matriculas."
      });
    else res.send(data.recordset);
  });
};

// Achar matricula com ra especifico
exports.findOne = (req, res) => {
  Matricula.findByRA(req.params.matriculaRA, req.params.cod, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontar o matricula com ra ${req.params.matriculaRA}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao busar o matricula com ra " + req.params.matriculaRA
        });
      }
    } else res.send(data);
  });
};

// Altera o matricula com ra específico
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!"
    });
  }

  Matricula.updateByRA(
    req.params.ra,
    new Matricula(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Não foi possível encontrar matricula com ra ${req.params.ra}.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar matricula com ra " + req.params.ra
          });
        }
      } else res.send(data.recordset);
    }
  );
};

// Deleta matricula com ra especifico
exports.delete = (req, res) => {
  Matricula.remove(req.params.cod,req.params.ra, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontrar matricula com ra ${req.params.ra}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao deletar matricula com ra " + req.params.ra
        });
      }
    } else res.send({
      message: `Matricula foi deletada com sucesso!`
    });
  });
};

// Delete todos os matriculas do banco
exports.deleteAll = (req, res) => {
  Matricula.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Algum erro ocorreu ao deletar as matriculas"
      });
    else res.send({
      message: `Todos as matriculas deletadas com sucesso!`
    });
  });
};