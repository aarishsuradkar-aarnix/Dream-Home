import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.resolve(__dirname, '../data/properties.json');

const ensureDataFile = async () => {
  try {
    await fs.access(dataFilePath);
  } catch (err) {
    if ((err).code === 'ENOENT') {
      await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
      await fs.writeFile(dataFilePath, JSON.stringify({ properties: [] }, null, 2), 'utf-8');
    } else {
      throw err;
    }
  }
};

const readData = async () => {
  await ensureDataFile();
  const raw = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(raw);
};

const writeData = async (data) => {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const getAllProperties = async () => {
  const data = await readData();
  return data.properties;
};

export const getPropertyById = async (id) => {
  const data = await readData();
  return data.properties.find((property) => property.id === id) ?? null;
};

export const createProperty = async (property) => {
  const data = await readData();
  const newProperty = {
    id: property.id ?? uuid(),
    approved: false,
    createdAt: new Date().toISOString(),
    ...property,
  };
  data.properties.push(newProperty);
  await writeData(data);
  return newProperty;
};

export const updateProperty = async (id, updates) => {
  const data = await readData();
  const index = data.properties.findIndex((property) => property.id === id);
  if (index === -1) {
    return null;
  }

  const updatedProperty = {
    ...data.properties[index],
    ...updates,
    id,
  };
  data.properties[index] = updatedProperty;
  await writeData(data);
  return updatedProperty;
};

export const deleteProperty = async (id) => {
  const data = await readData();
  const initialLength = data.properties.length;
  data.properties = data.properties.filter((property) => property.id !== id);
  if (data.properties.length === initialLength) {
    return false;
  }
  await writeData(data);
  return true;
};
