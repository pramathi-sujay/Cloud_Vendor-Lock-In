let deployments = [];

export const getDeployments = () => deployments;

export const addDeployment = (deployment) => {
  deployments.push(deployment);
};

export const findDeploymentById = (id) => {
  return deployments.find((d) => d.id == id);
};