import { Router } from 'express';
import {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../services/propertiesService.js';
import { propertyCreateSchema, propertyUpdateSchema } from '../validation/propertySchemas.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const properties = await getAllProperties();
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.json(property);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const parsed = propertyCreateSchema.parse(req.body);
    const newProperty = await createProperty(parsed);
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const parsed = propertyUpdateSchema.parse(req.body);
    const updatedProperty = await updateProperty(req.params.id, parsed);
    if (!updatedProperty) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.json(updatedProperty);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const success = await deleteProperty(req.params.id);
    if (!success) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
