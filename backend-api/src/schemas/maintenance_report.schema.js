const { z } = require("zod");

// Schema for the MAINTENANCE_REPORT table
const maintenanceReportSchema = z.object({
  device_id: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Device ID must be a non-negative integer." }), // Foreign Key, not null
  m_id: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Maintainer ID must be a non-negative integer." }), // Foreign Key, not null
    mr_date: z
    .string()
    .transform((val) => new Date(val))
    .refine((val) => !isNaN(val.getTime()), {
      message: "Invalid date",
    }),
  mr_note: z.string().nullable().optional(), // TEXT, nullable
});

const partialMaintenanceReportSchema = maintenanceReportSchema.partial();

module.exports = {
  maintenanceReportSchema,
  partialMaintenanceReportSchema,
};
