// const livre = require("livre");

const dbConnection = require("../configurations/dbConnection");

exports.getAllLivre = (req, res, next) => {
  dbConnection.query(`SELECT * FROM livres`, function (err, result) {
    if (err) res.status(301).json({ error: err });
    else res.status(200).json(result);
  });
};
exports.getLivre = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM livres WHERE ${req.params.id}`,
    function (err, result) {
      if (err) res.status(301).json({ error: err });
      else res.status(200).json(result);
    }
  );
};
exports.addLivre = (req, res, next) => {
  var path = "/uploads/defaults.jpg";
  if (req.file) {
    path = "/" + req.file.path.replace("\\", "/");
    console.log(path + "mdjdjjdjdjjdjdj");
  }
  const livre = {
    titre: req.body.titre,
    description: req.body.description,
    prix: req.body.prix,
    genre: req.body.genre,
    couverture: path,
  };
  dbConnection.query(
    `INSERT INTO livres (titre, description,prix,couverture,genre)  VALUES('${livre.titre}','${livre.description}',${livre.prix},'${livre.couverture}','${livre.genre}') `,
    function (err, result) {
      if (err) res.status(301).json({ error: err });
      else res.status(200).json(result);
    }
  );
};
exports.updateLivre = (req, res, next) => {
  dbConnection.query(
    `SELECT * FROM livres WHERE ${req.params.id}`,
    function (err, result) {
      if (err) res.status(301).json({ error: err });
      else {
        const livre = {
          titre: req.body.titre,
          description: req.body.description,
          id: req.params.id,
          prix: req.body.prix,
          genre: req.body.genre,
        };
        if (req.file) {
          livre.couverture = "/" + req.file.path;
          var filePath = result[0].couverture;
          if (!filePath.includes("defaults")) {
            var pathToFile = path.resolve("./") + filePath;
            fs.unlink(pathToFile, function (err) {
              if (!err) {
                console.log("Successfully deleted the file.");
              }
            });
          }
          dbConnection.query(
            `UPDATE livres SET description='${livre.description}',prix=${livre.prix},genre='${livre.genre}',couverture='${livre.couverture}',titre='${livre.titre}' WHERE id=${livre.id}`,
            function (err, result) {
              if (err) res.status(301).json({ error: err });
              else res.status(200).json(result);
            }
          );
        }

        dbConnection.query(
          `UPDATE livres SET description='${livre.description}',prix=${livre.prix},genre='${livre.genre}',titre='${livre.titre}' WHERE id=${livre.id}`,
          function (err, result) {
            if (err) res.status(301).json({ error: err });
            else res.status(200).json(result);
          }
        );
      }
    }
  );
};
exports.deleteLivre = (req, res, next) => {
  dbConnection.query(
    `DELETE FROM livres WHERE id=${req.params.id}`,
    function (err, result) {
      if (err) res.status(301).json({ error: err });
      else res.status(200).json(result);
    }
  );
};
