import { getCloudAdapter } from "../services/cloudFactory.js";
import { getDeployments, addDeployment, findDeploymentById } from "../data/store.js";

export const createDeployment = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const { provider, image, region } = req.body;

    const adapter = getCloudAdapter(provider);

    const deployment = await adapter.deploy(image, region);

    addDeployment(deployment);

    // Simulate lifecycle
    setTimeout(() => {
      deployment.status = "Running";
    }, 3000);

    setTimeout(() => {
      deployment.status = "Success";
    }, 6000);

    res.json(deployment);
  } catch (error) {
    console.error("Deployment Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const fetchDeployments = (req, res) => {
  res.json(getDeployments());
};

export const getStatus = (req, res) => {
  const deployment = findDeploymentById(req.params.id);

  if (!deployment) {
    return res.status(404).json({ message: "Deployment not found" });
  }

  res.json({ status: deployment.status });
};