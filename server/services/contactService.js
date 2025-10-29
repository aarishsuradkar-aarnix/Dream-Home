import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuid } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.resolve(__dirname, '../data/contactMessages.json');

const ensureDataFile = async () => {
  try {
    await fs.access(dataFilePath);
  } catch (err) {
    if ((err).code === 'ENOENT') {
      await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
      await fs.writeFile(dataFilePath, JSON.stringify({ messages: [] }, null, 2), 'utf-8');
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

export const submitContactRequest = async ({ name, email, message }) => {
  if (!name || !email || !message) {
    throw new Error('name, email, and message are required');
  }

  const data = await readData();
  const newMessage = {
    id: uuid(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };

  data.messages.push(newMessage);
  await writeData(data);

  return { success: true, message: 'Contact request submitted', data: newMessage };
};
