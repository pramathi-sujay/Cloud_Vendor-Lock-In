const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory store for deployments
let deployments = [];
let nextDeploymentId = 1;

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// GET /deployments - return all deployments
app.get('/deployments', (req, res) => {
  res.json(deployments);
});

// POST /deploy - create a mock deployment
app.post('/deploy', (req, res) => {
  const { provider, image, region } = req.body;

  if (!provider || !image || !region) {
    return res.status(400).json({
      error: 'provider, image and region are required',
    });
  }

  const deployment = {
    id: nextDeploymentId.toString(),
    provider,
    image,
    region,
    status: 'deploying',
    createdAt: new Date().toISOString(),
  };

  deployments.push(deployment);
  nextDeploymentId += 1;

  res.status(201).json(deployment);
});

// GET /status/:id - return deployment status by ID
app.get('/status/:id', (req, res) => {
  const { id } = req.params;
  const deployment = deployments.find((d) => d.id === id);

  if (!deployment) {
    return res.status(404).json({ error: 'Deployment not found' });
  }

  res.json({
    id: deployment.id,
    status: deployment.status,
    provider: deployment.provider,
    image: deployment.image,
    region: deployment.region,
    createdAt: deployment.createdAt,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});