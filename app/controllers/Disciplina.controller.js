const Disciplina = require("../models/Disciplina.model.js");

// Cria e salva um novo disciplina
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio"
    });
  }

  // Cria um Disciplina
  const disciplina = new Disciplina({
    cod: req.body.Cod,
    nome: req.body.Nome,
  });

  // Salva Disciplina no banco de dados
  Disciplina.create(disciplina, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao criar disciplina."
      });
    else res.send(data.recordset);
  });
};

// Pega todas as disciplinas do banco de dados
exports.findAll = (req, res) => {
  Disciplina.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao buscar disciplinas."
      });
    else res.send(data.recordset);
  });
};

// Achar disciplina com cod especifico
exports.findOne = (req, res) => {
  Disciplina.findByCod(req.params.disciplinaCOD, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontar o disciplina com cod ${req.params.disciplinaCOD}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao buscar o disciplina com cod " + req.params.disciplinaCOD
        });
      }
    } else res.send(data.recordset);
  });
};

// Altera a disciplina com id específico
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!"
    });
  }

  Disciplina.updateByRA(
    req.params.cod,
    new Disciplina(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Não foi possível encontrar disciplina com cod ${req.params.cod}.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar disciplina com cod " + req.params.cod
          });
        }
      } else res.send(data.recordset);
    }
  );
};

// Deleta disciplina com id especifico
exports.delete = (req, res) => {
  Disciplina.remove(req.params.cod, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontrar disciplina com cod ${req.params.disciplinaCOD}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao deletar disciplina com cod " + req.params.disciplinaCOD
        });
      }
    } else res.send({
      message: `Disciplina foi deletado com sucesso!`
    });
  });
};

// Delete todas as disciplinas do banco
exports.deleteAll = (req, res) => {
  Disciplina.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Algum erro ocorreu ao deletar as disciplinas"
      });
    else res.send({
      message: `Todas as disciplinas deletados com sucesso!`
    });
  });
};