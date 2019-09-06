const express = require("express");
const router = express.Router();
const validateProjectBody = require("../../middleware/validateProjectBody");
const validateProjectID = require("../../middleware/validateProjectID");
const {
  get,
  insert,
  update,
  remove,
  getProjectActions
} = require("../../data/helpers/projectModel");

router.post("/", validateProjectBody, async (req, res) => {
  try {
    const project = await insert(req.body);
    res.status(201).json({ project: project });
  } catch (errors) {
    res.status(500).json({ message: "Unable to create new project." });
  }
});

router.get("/:id", validateProjectID, async (req, res) => {
  try {
    const project = await get(req.params.id);
    res.json({ project: project });
  } catch (errors) {
    res.status(500).json({ message: "Unable to retrieve project." });
  }
});

router.put("/:id", validateProjectID, validateProjectBody, async (req, res) => {
  try {
    const project = await update(req.params.id, req.body);
    res.json({ project });
  } catch (errors) {
    console.log(errors);
    res.status(500).json({ message: "Unable to update the project." });
  }
});

router.delete("/:id", validateProjectID, async (req, res) => {
  try {
    const project = await remove(req.params.id);
    if (project === 1) res.json({ message: "The project has been deleted" });
  } catch (errors) {
    res.status(500).json({ message: "Unable to delete the project." });
  }
});

router.get("/:id/actions", async (req, res) => {
  try {
    const actions = await getProjectActions(req.params.id);

    if (actions.length > 0) {
      res.json({ actions });
    } else {
      res.json({ message: "There are no actions on the project." });
    }
  } catch (errors) {
    res.status(500).json({ message: "Unable to retrieve project actions" });
  }
});
module.exports = router;
