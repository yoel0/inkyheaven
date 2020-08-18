const express = require("express");
const ctrl = require("../controllers");

const router = express.Router();
router.post("/", ctrl.mylocations.create);
// router.delete("/:id", ctrl.mylocations.destroy);

module.exports = router;
