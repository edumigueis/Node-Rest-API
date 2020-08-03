const sql = require("./db.js");

// Construtor
const Aluno = function (aluno) {
  this.ra = aluno.ra;
  this.nome = aluno.nome;
};

Aluno.create = (newAluno, result) => {
  sql.query("INSERT INTO alunos SET ?", newAluno, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created aluno: ", {
      ra: res.insertRA,
      ...newAluno
    });
    result(null, {
      ra: res.insertRA,
      ...newAluno
    });
  });
};

Aluno.findByRA = (alunoRA, result) => {
  sql.query(`SELECT * FROM alunos WHERE ra = ${alunoRA}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Aluno encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Não achou o aluno com o ra
    result({
      kind: "not_found"
    }, null);
  });
};

Aluno.getAll = result => {
  sql.query("SELECT * FROM alunos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("alunos: ", res);
    result(null, res);
  });
};

Aluno.updateByRA = (ra, aluno, result) => {
  sql.query(
    "UPDATE alunos SET nome = ? WHERE ra = ?",
    [aluno.nome, ra],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou o aluno com esse ra
        result({
          kind: "not_found"
        }, null);
        return;
      }

      console.log("updated aluno: ", {
        ra: ra,
        ...aluno
      });
      result(null, {
        ra: ra,
        ...aluno
      });
    }
  );
};

Aluno.remove = (ra, result) => {
  sql.query("DELETE FROM alunos WHERE ra = ?", ra, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // não achou o aluno com esse ra
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("Aluno com ra: ", ra, " foi deletado");
    result(null, res);
  });
};

Aluno.removeAll = result => {
  sql.query("DELETE FROM alunos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} alunos`);
    result(null, res);
  });
};

module.exports = Aluno;