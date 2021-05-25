const express = require("express");
const router = express.Router();

const ToolController = require("../controllers/tools");

router.get("/", ToolController.get_all_tools);

router.post("/", ToolController.post_new_tool);

router.get("/:toolId", ToolController.get_one_tool);

router.patch("/:toolId", ToolController.update_one_tool);

router.delete("/:toolId", ToolController.delete_one_tool);

module.exports = router;
