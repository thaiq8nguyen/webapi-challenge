const express = require("express");
const router = express.Router();
const {
  get,
  insert,
  update,
  remove
} = require("../../data/helpers/actionModel");
const validateActionID = require("../../middleware/validateActionID");
const validateActionBody = require("../../middleware/validateActionBody");

router.get("/:id", validateActionID, async (req, res) => {
  try {
    const actions = await get(req.params.id);
    res.json({ actions });
  } catch (errors) {
    res.status(500).json({ message: "Unable to retrieve project actions." });
  }
});

router.post("/", validateActionBody, async (req, res) => {
  try {
    const action = await insert(req.body);
    res.status(201).json({ action });
  } catch (errors) {
    res.status(500).json({ message: "Unable to create project action" });
  }
});

router.put("/:id", validateActionID, validateActionBody, async (req, res) => {
  try {
    const updated_action = await update(req.params.id, req.body);

    res.json({ updated_action });
  } catch (errors) {
    res.status(500).json({ message: "Unable to update the project action" });
  }
});

router.delete("/:id", validateActionID, async (req, res) => {
  try {
    const deleted_action = await remove(req.params.id);
    if (deleted_action === 1) {
      res.json({ message: "The project action has been deleted." });
    }
  } catch (errors) {
    res.status(500).json({ message: "Unable to delete the project action" });
  }
});
module.exports = router;
