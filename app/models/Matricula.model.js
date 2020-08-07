const sql = require("./db.js");

// Construtor
const Matricula = function (matricula) {
  this.ra = matricula.ra;
  this.cod = matricula.cod;
};

Matricula.create = (newMatricula, result) => {
  sql.query(
    "INSERT INTO matriculasED VALUES (" +
      newMatricula.ra +
      "," +
      newMatricula.cod +
      ")",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created matricula: ", {
        ra: res.insertRA,
        ...newMatricula,
      });
      result(null, {
        id: res.insertRA,
        ...newMatricula,
      });
    }
  );
};

Matricula.findByRA = (matriculaRA, cod, result) => {
  sql.query(
    `SELECT * FROM matriculasED WHERE ra = ${matriculaRA} and cod = ${cod}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        console.log("Matricula encontrado: ", res.recordset[0]);
        result(null, res.recordset[0]);
        return;
      }

      // Não achou a matricula com o ra
      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

Matricula.getAll = (result) => {
  sql.query("SELECT * FROM matriculasED", (err, res) => {
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
    "UPDATE matriculasED SET COD = ? WHERE RA = ?",
    [matricula.cod, ra],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a matricula com esse ra
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("updated matricula: ", {
        id: id,
        ...matricula,
      });
      result(null, {
        id: id,
        ...matricula,
      });
    }
  );
};

Matricula.remove = (cod, ra, result) => {
  sql.query(
    "DELETE FROM matriculasED WHERE ra = " + ra + " and cod = " + cod, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.rowsAffected == 0) {
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("Matricula com ra: ", ra, " foi deletada");
      result(null);
    }
  );
};

Matricula.removeAll = (result) => {
  sql.query("DELETE FROM matriculasED", (err, res) => {
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
