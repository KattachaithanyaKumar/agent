import { randomUUID } from "node:crypto";

const configs = [];

export const createConfig = (config) => {
  const id = randomUUID();
  const newConfig = {
    id,
    ...config,
  };

  configs.push(newConfig);
  return newConfig;
};

export const getConfigs = () => {
  return configs;
};
