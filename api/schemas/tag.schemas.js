import Joi from "joi";

// here we store all validation schemas for tags

export const createTagSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50).required(), // name must be a string and is required
  color: Joi.string().trim().pattern(/^#[0-9A-Fa-f]{6}$/), // color must be in hexadecimal format (#RRGGBB)
});

export const updateTagSchema = Joi.object({
  name: Joi.string().trim().min(1).max(50), // name must be a string
  color: Joi.string().trim().pattern(/^#[0-9A-Fa-f]{6}$/), // color must be in hexadecimal format (#RRGGBB)
}).or("name", "color"); // at least one field must be provided for update