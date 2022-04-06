const db = require("../models");

const post = async (req, res) => {
  try {
    const { text, uid, postId } = req.body;

    const comment = await db.Comment.create({
      text: text,
      uid: uid,
      postId: postId,
    });
    res.status(200).json({ msg: "you commented" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const get = async (req, res) => {
  try {
    const comments = await db.Post.findAll({
      include: [
        {
          model: db.Comment,
          include: [db.User],
          required: true,
        },
      ],
    });

    res.status(200).send(comments);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  post,
  get,
};
