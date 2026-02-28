export const deploy = async (image, region) => {
    return {
      id: Date.now().toString(),
      provider: "AWS",
      image,
      region,
      status: "Pending",
      createdAt: new Date()
    };
  };