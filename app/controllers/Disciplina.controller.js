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
    id: req.body.id,
    nome: req.body.nome,
  });

  // Salva Disciplina no banco de dados
  Disciplina.create(disciplina, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao criar disciplina."
      });
    else res.send(data);
  });
};

// Pega todas as disciplinas do banco de dados
exports.findAll = (req, res) => {
  Disciplina.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao buscar disciplinas."
      });
    else res.send(data);
  });
};

// Achar disciplina com id especifico
exports.findOne = (req, res) => {
  Disciplina.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontar o disciplina com id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao buscar o disciplina com id " + req.params.id
        });
      }
    } else res.send(data);
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
    req.params.id,
    new Disciplina(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Não foi possível encontrar disciplina com id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar disciplina com id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Deleta disciplina com id especifico
exports.delete = (req, res) => {
  Disciplina.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontrar disciplina com id ${req.params.disciplinaId}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao deletar disciplina com id " + req.params.disciplinaId
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