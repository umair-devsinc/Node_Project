const { Router } = require("express");
const { model } = require("../config/database");
const router = Router();
const commentController = require("../controllers/commentController");

router.post("/comment", commentController.post);
router.get("/comment", commentController.get);

module.exports = router;
