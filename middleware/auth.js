module.exports = (req, res, next) => {
  if (!req.header("authorization")) {
    return res.status(400).json({ error: "user not authenticated" });
  }
  next();
};
