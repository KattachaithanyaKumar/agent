import express from "express";
import { getConfigs, createConfig } from "../features/config.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ getConfigs, message: "got all the configurations" });
});

router.post("/", (req, res) => {
  const { config } = req.body;
  const newConfig = createConfig(config);
  res.status(200).json({ newConfig, message: "configuration created" });
});

export default router;
