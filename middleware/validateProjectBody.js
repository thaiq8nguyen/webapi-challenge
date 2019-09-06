const validateProject = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "The project content is empty." });
  }

  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "Missing project name and description combination." });
  }

  next();
};
module.exports = validateProject;
