const { z } = require("zod");

// Schema for the UNIT table
// const unitSchema = z.object({
//   unit_id: z.coerce
//     .number()
//     .int()
//     .nonnegative({ message: "Unit ID must be a non-negative integer." }), // Primary Key, auto-generated
//   unit_name: z.string().min(1, { message: "Unit name cannot be empty." }), // TEXT not null
//   unit_location: z
//     .string()
//     .min(1, { message: "Unit location cannot be empty." }), // TEXT not null
// });

// Partial schema for updates (all fields optional)
// const partialUnitSchema = unitSchema.partial();

// For creation: no unit_id
const createUnitSchema = z.object({
  unit_name: z.string().min(1, { message: "Unit name cannot be empty." }),
  unit_location: z
    .string()
    .min(1, { message: "Unit location cannot be empty." }),
});

// For update: all fields optional
const partialUnitSchema = z.object({
  unit_id: z.coerce.number().int().nonnegative().optional(),
  unit_name: z.string().min(1).optional(),
  unit_location: z.string().min(1).optional(),
});

module.exports = {
  createUnitSchema,
  partialUnitSchema,
};
