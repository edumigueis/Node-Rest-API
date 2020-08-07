const sql = require("./db.js");
/*const Matricula = require("./Matricula.model.js");*/

// Construtor
const Aluno = function (aluno) {
  this.ra = aluno.ra;
  this.nome = aluno.nome;
};

Aluno.create = (newAluno, result) => {
  sql.query(
    "INSERT INTO alunos VALUES(" + newAluno.ra + "," + newAluno.nome + ")",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created aluno: ", {
        ra: res.insertRA,
        ...newAluno,
      });
      result(null, {
        ra: res.insertRA,
        ...newAluno,
      });
    }
  );
};

Aluno.findByRA = (alunoRA, result) => {

  sql.query(`SELECT * FROM alunosED WHERE ra = ${alunoRA}`, (err, res) => {
    console.log(res);
    if (res.recordset.length > 0) {
      console.log("Aluno encontrado: ", res);
      result(null, res.recordset[0]);
      return;
    }

    if (err) {
      console.log(alunoRA);
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // Não achou o aluno com o ra
    result(
      {
        kind: "not_found",
      },
      null
    );
  });
};

Aluno.getAll = (result) => {
  sql.query("SELECT * FROM alunosED", (err, res) => {
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
    "UPDATE alunosED SET nome = ? WHERE ra = ?",
    [aluno.nome, ra],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.recordset.length == 0) {
        // não achou o aluno com esse ra
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("updated aluno: ", {
        ra: ra,
        ...aluno,
      });
      result(null, {
        ra: ra,
        ...aluno,
      });
    }
  );
};

Aluno.remove = (ra, result) => {
  sql.query("DELETE FROM alunosED WHERE ra = ?", ra, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // não achou o aluno com esse ra
      result(
        {
          kind: "not_found",
        },
        null
      );
      return;
    }

    console.log("Aluno com ra: ", ra, " foi deletado");
    result(null, res);
  });
};

Aluno.removeAll = (result) => {
  sql.query("DELETE FROM alunosED", (err, res) => {
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
