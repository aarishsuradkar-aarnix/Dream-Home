import { Router } from 'express';
import { submitContactRequest } from '../services/contactService.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const result = await submitContactRequest(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
