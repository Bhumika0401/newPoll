const router = require("express").Router();
const { getDataByType } = require("../controllers/dataController");

router.get("/:type", getDataByType);

module.exports = router;