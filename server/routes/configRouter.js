import express from "express";
import { getConfigs, createConfig, deleteConfig } from "../features/config.js";

const router = express.Router();

router.get("/", (req, res) => {
  const configs = getConfigs();
  res.status(200).json({ configs, message: "got all the configurations" });
});

router.post("/", (req, res) => {
  const { config } = req.body;
  const newConfig = createConfig(config);
  res.status(200).json({ newConfig, message: "configuration created" });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleted = deleteConfig(id);

  if (!deleted) {
    return res.status(404).json({ message: "config not found" });
  }

  res.status(200).json({ id, message: "config deleted successfully" });
});

export default router;
