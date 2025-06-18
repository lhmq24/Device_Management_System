const express = require("express");
const { z } = require("zod");

const maintenanceReportsController = require("../controllers/maintenance_report.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const { validateRequest } = require("../middlewares/validator.middlewares");
const {
  maintenanceReportSchema,
  partialMaintenanceReportSchema,
} = require("../schemas/maintenance_report.schema");

const router = express.Router();
module.exports.setup = (app) => {   
    app.use("/api", router);
    // GET /api/maintenance-reports
    router.get(
        "/maintenance-reports",
        validateRequest(
            z.object({
                search: z.string().max(255).optional(),
                page: z.coerce.number().nonnegative().default(1),
                limit: z.coerce.number().nonnegative().default(5),
            }).strict()
        ),
        maintenanceReportsController.getManyMaintenanceReports
    );

    // POST /api/maintenance-reports
    router.post(
        "/maintenance-reports",
        validateRequest(
            z.object({
                maintenanceReport: maintenanceReportSchema
                    .omit({ m_id: true })
                    .strict(),
            }).strict()
        ),
        maintenanceReportsController.createMaintenanceReport
    );

    // GET /api/maintenance-reports/:id
    router.get(
        "/maintenance-reports/:id",
        validateRequest(
            z.object({
                id: z.coerce.number().int().positive(),
            })
        ),
        maintenanceReportsController.getMaintenanceReportById
    );

    // PUT /api/maintenance-reports/:id
    router.put(
        "/maintenance-reports/:id",
        validateRequest(
            z.object({
                id: z.coerce.number().int().positive(),
                maintenanceReport: partialMaintenanceReportSchema.strict(),
            })
        ),
        maintenanceReportsController.updateMaintenanceReportById
    );

    // DELETE /api/maintenance-reports/:id
    router.delete(
        "/maintenance-reports/:id",
        validateRequest(
            z.object({
                id: z.coerce.number().int().positive(),
            })
        ),
        maintenanceReportsController.deleteMaintenanceReportById
    );

    // Method Not Allowed for all other methods
    router.all("/maintenance-reports", methodNotAllowed);
}