const Resultado = require("../models/Resultado.model.js");
const Matricula = require("../models/Matricula.model.js");
const Aluno = require("../models/Aluno.model.js");
const Disciplina = require("../models/Disciplina.model.js");

// Cria e salva um novo resultado
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio"
    });
  }
  
  // Cria um Resultado
  const resultado = new Resultado({
    ra: req.body.ra,
    nome: req.body.nome,
    nota: req.body.nota,
    frequencia: req.body.frequencia,
    cod: req.body.cod,
  });

  Aluno.findByRA(resultado.ra, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Este aluno não existe."
      });
      return;
    }
  });

  Matricula.remove(resultado.cod, resultado.ra, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Esta disciplina não existe."
      });
      return;
    }
  });

  /*Matricula.findByRA("")*/

  // Salva Resultado no banco de dados
  Resultado.create(resultado, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao criar resultado."
      });
    else res.send(data.recordset);
  });
};

// Pega todos os resultados do banco de dados
exports.findAll = (req, res) => {
  Resultado.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao buscar resultados."
      });
    else res.send(data.recordset);
  });
};

// Achar resultado com ra especifico
exports.findOne = (req, res) => {
  Resultado.findById(req.params.ra, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontar o resultado com ra ${req.params.ra}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao busar o resultado com ra " + req.params.ra
        });
      }
    } else res.send(data.recordset);
  });
};

// Altera o resultado com ra específico
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!"
    });
  }

  Resultado.updateByRA(
    req.params.ra,
    new Resultado(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Não foi possível encontrar resultado com ra ${req.params.ra}.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar resultado com ra " + req.params.ra
          });
        }
      } else res.send(data);
    }
  );
};

// Deleta resultado com ra especifico
exports.delete = (req, res) => {
  Resultado.remove(req.params.ra, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontrar resultado com ra ${req.params.resultadoId}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao deletar resultado com ra " + req.params.resultadoId
        });
      }
    } else res.send({
      message: `Resultado foi deletado com sucesso!`
    });
  });
};

// Delete todos os resultados do banco
exports.deleteAll = (req, res) => {
  Resultado.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Algum erro ocorreu ao deletar os resultados"
      });
    else res.send({
      message: `Todos os resultados deletados com sucesso!`
    });
  });
};