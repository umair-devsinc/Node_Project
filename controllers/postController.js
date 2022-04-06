const db = require("../models");

const post = async (req, res) => {
  try {
    const { title, content, flag, uid } = req.body;

    const post = await db.Post.create({
      title: title,
      content: content,
      flag: flag,
      uid: uid,
    });
    res.status(200).json({ msg: "post saved" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const get = async (req, res) => {
  try {
    let conditions = req.query.id
      ? {
          uid: req.query.id,
          flag: false,
        }
      : {
          flag: true,
        };

    const posts = await db.Post.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.Comment,
          include: [db.User],
          required: false,
        },
      ],
      where: conditions,
      offset: req.params["offset"],
      limit: 2,
    });

    res.status(200).send(posts);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const count = async (req, res) => {
  try {
    let conditions = req.query.id
      ? {
          uid: req.query.id,
          flag: false,
        }
      : {
          flag: true,
        };

    const postCount = await db.Post.count({
      where: conditions,
    });

    res.status(200).send({ count: postCount });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const singlePost = async (req, res) => {
  try {
    const posts = await db.Post.findOne({
      where: { id: req.params["id"] },
      include: [
        {
          model: db.Comment,
          include: [db.User],
          required: false,
        },
      ],
    });

    res.status(200).send(posts);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const edit = async (req, res) => {
  try {
    const { title, content } = req.body;

    const posts = await db.Post.update(
      {
        title: title,
        content: content,
      },
      {
        where: {
          id: req.params["id"],
        },
      }
    );
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const draft = async (req, res) => {
  try {
    const posts = await db.Post.update(
      {
        flag: req.params["flag"],
      },
      {
        where: {
          id: req.params["id"],
        },
      }
    );
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const deletee = async (req, res) => {
  try {
    const posts = await db.Post.destroy({
      where: {
        id: req.query.id,
      },
    });

    res.status(200).send("deleted");
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  post,
  get,
  edit,
  draft,
  deletee,
  singlePost,
  count,
};
