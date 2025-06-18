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
  mr_date: z.coerce.date({
    message: "Maintenance report date must be a valid date.",
    required_error: "Maintenance report date is required.",
    
  }), // DATE not null
  mr_note: z.string().nullable().optional(), // TEXT, nullable
});

// Partial schema for updates (all fields optional)
// Note: For composite primary keys, partial updates might need special handling
// depending on how you identify the record to update.
const partialMaintenanceReportSchema = maintenanceReportSchema.partial();

module.exports = {
  maintenanceReportSchema,
  partialMaintenanceReportSchema,
};
