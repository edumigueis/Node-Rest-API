const sql = require("./db.js");

// Construtor
const Resultado = function (resultado) {
  this.ra = resultado.ra;
  this.nota = resultado.nota;
  this.cod = resultado.cod, 
  this.frequencia = resultado.frequencia;
};

Resultado.create = (newResultado, result) => {
  sql.query(
    "INSERT INTO resultados VALUES (" +
      newResultado.ra +
      "," +
      newResultado.cod +
      "," +
      newResultado.nota +
      "," +
      newResultado.frequencia +
      ")",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created resultado");
      result(null);
    }
  );
};

Resultado.findById = (ra, cod, result) => {
  sql.query(
    `SELECT * FROM resultados WHERE ra = ${ra} and cod = ${cod}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log(res);
      if (res.recordset.length > 0) {
        console.log("Resultado encontrado: ", res.recordset[0]);
        result(null, res.recordset[0]);
        return;
      }

      // Não achou o resultado com o ra
      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

Resultado.getAll = (result) => {
  sql.query("SELECT * FROM resultados", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("resultados: ", res.recordset);
    result(null, res.recordset);
  });
};

Resultado.updateByRA = (ra, resultado, result) => {
  sql.query(
    "UPDATE resultados SET nota = ?, frequencia =?, cod =?  WHERE ra = ?",
    [resultado.nome, ra],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou o resultado com esse ra
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("updated resultado: ", {
        id: id,
        ...resultado,
      });
      result(null, {
        id: id,
        ...resultado,
      });
    }
  );
};

Resultado.remove = (ra, result) => {
  sql.query("DELETE FROM resultados WHERE ra = ?", ra, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // não achou o resultado com esse ra
      result(
        {
          kind: "not_found",
        },
        null
      );
      return;
    }

    console.log("Resultado com ra: ", ra, " foi deletado");
    result(null, res);
  });
};

Resultado.removeAll = (result) => {
  sql.query("DELETE FROM resultados", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} resultados`);
    result(null, res);
  });
};

module.exports = Resultado;
