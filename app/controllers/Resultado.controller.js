const Resultado = require("../models/Resultado.model.js");
const Matricula = require("../models/Matricula.model.js");
const Aluno = require("../models/Aluno.model.js");
const Disciplina = require("../models/Disciplina.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio",
    });
  }

  const resultado = new Resultado({
    ra: req.body.RA,
    nota: req.body.Nota,
    cod: req.body.Cod,
    frequencia: req.body.Frequencia,
  });

  Aluno.findByRA(resultado.ra, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Este aluno não existe.",
      });
    }
    else {
      Disciplina.findByCod(resultado.cod, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Esta disciplina não existe.",
          });
        }
        else {
          Matricula.remove(resultado.cod, resultado.ra, (err, data) => {
            if (err) {
              res.status(500).send({
                message: err.message || "Esta matricula não existe.",
              });
            }
            else {
              Resultado.create(resultado, (err, data) => {
                if (err)
                  res.status(500).send({
                    message: err.message || "Erro ao criar resultado.",
                  });
                else 
                res.sendStatus(200);
              });
            }
          })
        }
      })
    }
  })
}

exports.findAll = (req, res) => {
  Resultado.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao buscar resultados.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Resultado.findById(req.params.ra, req.params.cod, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontar o resultado com ra ${req.params.ra}.`,
        });
      } else {
        res.status(500).send({
          message: "Erro ao busar o resultado com ra " + req.params.ra,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!",
    });
  }

  Resultado.updateByRA(req.params.ra, new Resultado(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontrar resultado com ra ${req.params.ra}.`,
        });
      } else {
        res.status(500).send({
          message: "Erro ao atualizar resultado com ra " + req.params.ra,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Resultado.remove(req.params.ra, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontrar resultado com ra ${req.params.resultadoId}.`,
        });
      } else {
        res.status(500).send({
          message: "Erro ao deletar resultado com ra " + req.params.resultadoId,
        });
      }
    } else
      res.send({
        message: `Resultado foi deletado com sucesso!`,
      });
  });
};

exports.deleteAll = (req, res) => {
  Resultado.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Algum erro ocorreu ao deletar os resultados",
      });
    else
      res.send({
        message: `Todos os resultados deletados com sucesso!`,
      });
  });
};
