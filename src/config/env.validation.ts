import * as Joi from 'joi';

export const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  FRONTEND_URL: Joi.string().uri().required().messages({
    'string.empty': 'FRONTEND_URL is required in .env',
    'string.uri': 'FRONTEND_URL must be a valid URI in .env',
  }),
  MONGODB_URI: Joi.string().uri().required().messages({
    'string.empty': 'MONGODB_URI is required in .env',
    'string.uri': 'MONGODB_URI must be a valid URI in .env',
  }),
});
