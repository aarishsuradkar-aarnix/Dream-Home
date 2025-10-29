import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import propertiesRouter from './routes/properties.js';
import contactRouter from './routes/contact.js';

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || '').split(',').map(origin => origin.trim()).filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : '*',
}));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/properties', propertiesRouter);
app.use('/api/contact', contactRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
