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

export const deleteConfig = (id) => {
  const configIndex = configs.findIndex((config) => config.id === id);
  if (configIndex === -1) {
    return false;
  }

  configs.splice(configIndex, 1);
  return true;
};

export const getConfig = (id) => {
  return configs.find((config) => config.id === id);
};
