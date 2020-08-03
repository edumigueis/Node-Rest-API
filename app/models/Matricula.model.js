const sql = require("./db.js");

// Construtor
const Matricula = function (matricula) {
  this.ra = matricula.ra;
  this.cod = matricula.cod;
};

Matricula.create = (newMatricula, result) => {
  sql.query("INSERT INTO matriculas SET ?", newMatricula, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created matricula: ", {
      ra: res.insertRA,
      ...newMatricula
    });
    result(null, {
      id: res.insertRA,
      ...newMatricula
    });
  });
};

Matricula.findByRA = (matriculaRA, result) => {
  sql.query(`SELECT * FROM matriculas WHERE id = ${matriculaRA}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Matricula encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Não achou a matricula com o ra
    result({
      kind: "not_found"
    }, null);
  });
};

Matricula.getAll = result => {
  sql.query("SELECT * FROM matriculas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("matriculas: ", res);
    result(null, res);
  });
};

Matricula.updateByRA = (ra, matricula, result) => {
  sql.query(
    "UPDATE matriculas SET COD = ? WHERE RA = ?",
    [matricula.cod, ra],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a matricula com esse ra
        result({
          kind: "not_found"
        }, null);
        return;
      }

      console.log("updated matricula: ", {
        id: id,
        ...matricula
      });
      result(null, {
        id: id,
        ...matricula
      });
    }
  );
};

Matricula.remove = (ra, result) => {
  sql.query("DELETE FROM matriculas WHERE ra = ?", ra, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // não achou o matricula com esse ra
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("Matricula com ra: ", ra, " foi deletada");
    result(null, res);
  });
};

Matricula.removeAll = result => {
  sql.query("DELETE FROM matriculas", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} matriculas`);
    result(null, res);
  });
};

module.exports = Matricula;