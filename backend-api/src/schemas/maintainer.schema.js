const { z } = require("zod");

// Schema for the MAINTAINER table
const maintainerSchema = z.object({
  m_id: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Maintainer ID must be a non-negative integer." }), // Primary Key, auto-generated
  m_name: z.string().min(1, { message: "Maintainer name cannot be empty." }), // TEXT not null
  m_phone: z.string().min(1, { message: "Maintainer phone cannot be empty." }), // TEXT not null
  m_email: z.string().email({ message: "Invalid email address." }), // TEXT not null
});

// Partial schema for updates (all fields optional)
const partialMaintainerSchema = maintainerSchema.partial();

module.exports = {
  maintainerSchema,
  partialMaintainerSchema,
};
