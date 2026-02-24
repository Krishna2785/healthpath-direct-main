import axios from 'axios';

class AIServiceError extends Error {
  constructor(message, statusCode = 502) {
    super(message);
    this.name = 'AIServiceError';
    this.statusCode = statusCode;
  }
}

export async function getSuggestedSpecialty(symptoms) {
  if (!process.env.GEMINI_API_KEY) {
    throw new AIServiceError('AI service is not configured');
  }

  const prompt =
    'Based on the following symptoms, suggest the most appropriate medical specialty. ' +
    'Do not provide diagnosis. Only return specialty name.\n\n' +
    `Symptoms: ${symptoms}`;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
        timeout: 10000,
      },
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      throw new AIServiceError('Empty response from AI service');
    }

    const firstLine = text.split('\n')[0].trim();
    const specialty = firstLine.replace(/^Specialty\s*:\s*/i, '').trim();

    if (!specialty) {
      throw new AIServiceError('Unable to parse specialty from AI response');
    }

    return specialty;
  } catch (error) {
    if (error.response) {
      console.error('Gemini API error:', error.response.status);
    } else {
      console.error('Gemini API error:', error.message);
    }

    throw new AIServiceError('Failed to get suggestion from AI service');
  }
}

export { AIServiceError };

