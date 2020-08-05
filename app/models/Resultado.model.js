const sql = require("./db.js");

// Construtor
const Resultado = function (resultado) {
  this.ra = resultado.ra;
  this.nome = resultado.nome;
  (this.nota = resultado.nota), (this.frequencia = resultado.frequencia);
};

Resultado.create = (newResultado, result) => {
  sql.query(
    "INSERT INTO resultados (" +
      newResultado.ra +
      "," +
      newResultado.nome +
      "," +
      newResultado.nota +
      "," +
      newResultado.frquencia +
      ")",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created resultado: ", {
        ra: res.insertRA,
        ...newResultado,
      });
      result(null, {
        id: res.insertRA,
        ...newResultado,
      });
    }
  );
};

Resultado.findByRA = (resultadoRA, result) => {
  sql.query(
    `SELECT * FROM resultados WHERE id = ${resultadoRA}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Resultado encontrado: ", res[0]);
        result(null, res[0]);
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

    console.log("resultados: ", res);
    result(null, res);
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
