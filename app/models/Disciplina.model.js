const sql = require("./db.js");

// Construtor
const Disciplina = function (disciplina) {
  this.cod = disciplina.cod;
  this.nome = disciplina.nome;
};

Disciplina.create = (newDisciplina, result) => {
  sql.query(
    "INSERT INTO disciplinas VALUES(" +
      newDisciplina.cod +
      "," +
      newDisciplina.nome +
      ")",
    newDisciplina,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created disciplina: ", {
        cod: res.insertRA,
        ...newDisciplina,
      });
      result(null, {
        cod: res.insertRA,
        ...newDisciplina,
      });
    }
  );
};

Disciplina.findByCod = (disciplinaCOD, result) => {
  sql.query(
    `SELECT * FROM disciplinas WHERE cod = ${disciplinaCOD}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        console.log("Disciplina encontrada: ", res);
        result(null, res);
        return;
      }

      // Não achou a disciplina com o cod
      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

Disciplina.getAll = (result) => {
  sql.query("SELECT * FROM disciplinas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("disciplinas: ", res);
    result(null, res.recordset);
  });
};

Disciplina.updateByRA = (cod, disciplina, result) => {
  sql.query(
    "UPDATE disciplinas SET nome = ? WHERE cod = ?",
    [disciplina.nome, cod],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a disciplina com esse cod
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("updated disciplina: ", {
        cod: cod,
        ...disciplina,
      });
      result(null, {
        cod: cod,
        ...disciplina,
      });
    }
  );
};

Disciplina.remove = (cod, result) => {
  sql.query("DELETE FROM disciplinas WHERE cod = ?", cod, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // não achou a disciplina com esse cod
      result(
        {
          kind: "not_found",
        },
        null
      );
      return;
    }

    console.log("Disciplina com cod: ", cod, " foi deletado");
    result(null, res);
  });
};

Disciplina.removeAll = (result) => {
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
