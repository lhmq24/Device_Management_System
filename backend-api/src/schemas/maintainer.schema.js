const { z } = require("zod");

// Schema for the MAINTAINER table
const maintainerSchema = z.object({
  M_ID: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Maintainer ID must be a non-negative integer." }), // Primary Key, auto-generated
  M_NAME: z.string().min(1, { message: "Maintainer name cannot be empty." }), // TEXT not null
  M_PHONE: z.string().min(1, { message: "Maintainer phone cannot be empty." }), // TEXT not null
  M_EMAIL: z.string().email({ message: "Invalid email address." }), // TEXT not null
});

// Partial schema for updates (all fields optional)
const partialMaintainerSchema = maintainerSchema.partial();

module.exports = {
  maintainerSchema,
  partialMaintainerSchema,
};
