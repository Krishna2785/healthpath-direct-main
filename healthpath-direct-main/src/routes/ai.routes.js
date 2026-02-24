import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import { aiSymptomCheck } from '../controllers/ai.controller.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

const validateSymptomCheck = [
  body('symptoms')
    .isString()
    .withMessage('symptoms must be a string')
    .isLength({ min: 5 })
    .withMessage('symptoms must be at least 5 characters long')
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          details: errors.array().map((err) => ({
            field: err.param,
            message: err.msg,
          })),
        },
      });
    }

    return next();
  },
];

router.post('/symptom-check', aiRateLimiter, validateSymptomCheck, aiSymptomCheck);

export default router;

