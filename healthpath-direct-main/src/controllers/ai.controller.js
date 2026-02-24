import { getSuggestedSpecialty, AIServiceError } from '../services/ai.service.js';

export async function aiSymptomCheck(req, res, next) {
  try {
    const { symptoms } = req.body;

    const specialty = await getSuggestedSpecialty(symptoms);

    return res.status(200).json({
      specialty,
    });
  } catch (error) {
    if (error instanceof AIServiceError) {
      return res.status(error.statusCode || 502).json({
        error: {
          message: error.message,
        },
      });
    }

    return next(error);
  }
}

