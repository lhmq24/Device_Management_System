const express = require("express");
const { z } = require("zod");
const multer = require("multer");

const maintenanceReportsController = require("../controllers/maintenance_report.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const { validateRequest } = require("../middlewares/validator.middlewares");
const {
  maintenanceReportSchema,
  partialMaintenanceReportSchema,
} = require("../schemas/maintenance_report.schema");

const upload = multer();

const router = express.Router();
module.exports.setup = (app) => {
  app.use("/api", router);
  // GET /api/maintenance-reports?device_id=1&m_id=2&mr_date=2025-06-19
  router.get(
    "/maintenance-reports",
    validateRequest(
      z
        .object({
          device_id: z.coerce.number().int().positive().optional(),
          m_id: z.coerce.number().int().positive().optional(),
          mr_date: z.coerce.date().optional(),
          page: z.coerce.number().nonnegative().default(1),
          limit: z.coerce.number().nonnegative().default(5),
        })
        .strict()
    ),
    (req, res, next) => {
      const { device_id, m_id, mr_date } = req.validatedData;

      if (device_id && m_id && mr_date) {
        return maintenanceReportsController.getReport(req, res, next); // get single report
      }
      console.log("Fetching reports with no params in controller:", req.validatedData);
      return maintenanceReportsController.getReports(req, res, next); // paginated list
    }
  );

  // POST /api/maintenance-reports
  router.post(
    "/maintenance-reports",
    upload.none(),
    validateRequest(
         maintenanceReportSchema.strict(),
    ),
    maintenanceReportsController.createReport
  );

  // PUT /api/maintenance-reports
  router.put(
    "/maintenance-reports",
    upload.none(),
    validateRequest(
        partialMaintenanceReportSchema.strict()
    ),
    maintenanceReportsController.updateReport
  );

  // DELETE /api/maintenance-reports?device_id=1&m_id=2&mr_date=2025-06-19
  router.delete(
    "/maintenance-reports",
    validateRequest(
      z.object({
        device_id: z.coerce.number().int().positive(),
        m_id: z.coerce.number().int().positive(),
        mr_date: z.coerce.date(),
      })
    ),
    maintenanceReportsController.deleteReport
  );

  // Method Not Allowed for all other methods
  // Method Not Allowed for unsupported methods on each route
  router.all("/maintenance-reports", (req, res, next) => {
    if (!["GET", "POST"].includes(req.method))
      return methodNotAllowed(req, res);
    next();
  });

  router.all("/maintenance-reports/:id", (req, res, next) => {
    if (!["GET", "PUT", "DELETE"].includes(req.method))
      return methodNotAllowed(req, res);
    next();
  });
};
