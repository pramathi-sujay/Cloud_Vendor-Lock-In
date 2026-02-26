import express from "express";
import {
  createDeployment,
  fetchDeployments,
  getStatus
} from "../controllers/deploymentController.js";

const router = express.Router();

router.post("/deploy", createDeployment);
router.get("/deployments", fetchDeployments);
router.get("/status/:id", getStatus);

export default router;