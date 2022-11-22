const express = require("express");
const router = express.Router();
const _multer = require("../middlewares/uploadeImage");
const livreController = require("../controllers/livreController");

router.get("/livres", livreController.getAllLivre);
router.post(
  "/livre",
  _multer.upload.single("couverture"),
  livreController.addLivre
);
router.get("/livre/:id", livreController.getLivre);
router.put(
  "/livre/:id",
  _multer.upload.single("couverture"),
  livreController.updateLivre
);
router.delete("/livre/:id", livreController.deleteLivre);

module.exports = router;
