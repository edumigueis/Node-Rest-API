const sql = require("./db.js");

// Construtor
const Disciplina = function (disciplina) {
  this.id = disciplina.id;
  this.nome = disciplina.nome;
};

Disciplina.create = (newDisciplina, result) => {
  sql.query("INSERT INTO disciplinas SET ?", newDisciplina, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created disciplina: ", {
      id: res.insertRA,
      ...newDisciplina
    });
    result(null, {
      id: res.insertRA,
      ...newDisciplina
    });
  });
};

Disciplina.findByCod = (disciplinaCOD, result) => {
  sql.query(`SELECT * FROM disciplinas WHERE id = ${disciplinaCOD}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Disciplina encontrada: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Não achou a disciplina com o id
    result({
      kind: "not_found"
    }, null);
  });
};

Disciplina.getAll = result => {
  sql.query("SELECT * FROM disciplinas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("disciplinas: ", res);
    result(null, res);
  });
};

Disciplina.updateByRA = (id, disciplina, result) => {
  sql.query(
    "UPDATE disciplinas SET nome = ? WHERE id = ?",
    [disciplina.nome, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a disciplina com esse id
        result({
          kind: "not_found"
        }, null);
        return;
      }

      console.log("updated disciplina: ", {
        id: id,
        ...disciplina
      });
      result(null, {
        id: id,
        ...disciplina
      });
    }
  );
};

Disciplina.remove = (id, result) => {
  sql.query("DELETE FROM disciplinas WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // não achou a disciplina com esse id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("Disciplina com id: ", id, " foi deletado");
    result(null, res);
  });
};

Disciplina.removeAll = result => {
  sql.query("DELETE FROM disciplinas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} disciplinas`);
    result(null, res);
  });
};

module.exports = Disciplina;