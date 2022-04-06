const { Router } = require("express");
const db = require("../models");
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

const router = Router();

router.post("/post", auth, postController.post);

router.get("/post/:offset", postController.get);

router.get("/postCount", postController.count);

router.get("/singlePost/:id", postController.singlePost);

router.put("/post/:id", postController.edit);

router.put("/dPost/:id/:flag", postController.draft);

router.delete("/post", postController.deletee);

//test
router.get("/testing", async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          required: true,
        },
      ],
    });

    res.status(200).send(posts);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
