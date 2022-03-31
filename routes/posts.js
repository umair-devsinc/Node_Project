const { Router } = require("express");
const db = require("../models");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const router = Router();

router.post("/post", auth, postController.post);

router.get("/post", postController.get);

router.get("/singlePost/:id", postController.singlePost);

router.put("/post/:id", postController.edit);

router.put("/dPost/:id/:flag", auth, postController.draft);

router.delete("/post", postController.deletee);

module.exports = router;
