export const deploy = async (image, region) => {
  return {
    id: Date.now().toString(),
    provider: "GCP",
    image,
    region,
    status: "Pending",
    createdAt: new Date()
  };
};