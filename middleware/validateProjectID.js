const { get } = require("../data/helpers/projectModel");

module.exports = async (req, res, next) => {
  const id = req.params.id;
  try {
    const action = await get(id);
    if (action) {
      next();
    } else {
      res.json({ message: "Invalid project id" });
    }
  } catch (errors) {
    res.status(500).json({ message: "Unable to validate project id" });
  }
};
