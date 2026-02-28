import * as awsAdapter from "./awsAdapter.js";
import * as gcpAdapter from "./gcpAdapter.js";

export const getCloudAdapter = (provider) => {
  if (!provider) {
    throw new Error("Provider is required");
  }

  const normalized = provider.toLowerCase();

  if (normalized === "aws") {
    return awsAdapter;
  }

  if (normalized === "gcp" || normalized === "google") {
    return gcpAdapter;
  }

  throw new Error(`Unsupported cloud provider: ${provider}`);
};