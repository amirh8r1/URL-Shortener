const { z } = require("zod");

const createShortUrlSchema = z.object({
  url: z.string().url(),
  ttlMinutes: z
    .number()
    .int()
    .positive()
    .max(60 * 24 * 30)
    .optional(), // max 30 days
});

const codeParamSchema = z.object({
  code: z
    .string()
    .length(4)
    .regex(/^[a-zA-Z0-9]+$/),
});

const paginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 1))
    .refine((v) => Number.isInteger(v) && v > 0, {
      message: "page must be a positive integer",
    }),

  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 20))
    .refine((v) => Number.isInteger(v) && v > 0 && v <= 100, {
      message: "limit must be between 1 and 100",
    }),
});

module.exports = {
  createShortUrlSchema,
  codeParamSchema,
  paginationQuerySchema,
};
