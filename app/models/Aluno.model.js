const sql = require("./db.js");
/*const Matricula = require("./Matricula.model.js");*/

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
  sql.query(`SELECT * FROM alunosED WHERE ra = ${alunoRA}`, (err, res) => {
    console.log(res.recordset.length)
    if (res.recordset.length > 0) {
      console.log("Aluno encontrado: ", res);
      result(null, res[0]);
      return;
    }


    if (err) {
      console.log(alunoRA);
      console.log("error: ", err);
      result(err, null);
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

      if (res.recordset.length == 0) {
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
/*Aluno.insertAndUpdate = (ra, codigo, nota, frequencia) => {
  if (Matricula.findByRA(ra) == null) {
    console.log("Essa matrícula não existe");
    return;
  }
  if (Aluno.findByRA(ra) == null) {
    console.log("Esse aluno não existe");
    return;
  }
  if (Disciplina.findByCOD == null) {
    console.log("Essa disciplina não existe");
    return;
  }
  sql.query("DELETE FROM MATRICULAS WHERE RA=? AND COD=?", [ra, codigo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Matrícula deletada com sucesso!")
    result(null, res);
  })
  sql.query("INSERT INTO RESULTADOS VALUES(" + ra + ", " + codigo + ", " + nota + ", " + ", " + frequencia + ")", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Resultado inserido com sucesso com sucesso!")
    result(null, res);
  })
}*/
module.exports = Aluno;