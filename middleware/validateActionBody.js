module.exports = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "Invalid action content." });
  }

  if (!req.body.project_id || !req.body.description) {
    res
      .status(400)
      .json({ message: "Missing project id and description combination." });
  }

  next();
};
