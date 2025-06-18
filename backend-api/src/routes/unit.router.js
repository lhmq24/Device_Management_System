const express = require("express");
const { z } = require("zod");

const unitsController = require("../controllers/unit.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const { validateRequest } = require("../middlewares/validator.middlewares");
const { unitSchema, partialUnitSchema } = require("../schemas/unit.schema");

const router = express.Router();
module.exports.setup = (app) => {
  app.use("/api", router);
  // GET /api/units
  router.get(
    "/units",
    validateRequest(
      z
        .object({
          search: z.string().max(255).optional(),
          page: z.coerce.number().nonnegative().default(1),
          limit: z.coerce.number().nonnegative().default(5),
        })
        .strict()
    ),
    unitsController.getUnits
  );

  // POST /api/units
  router.post(
    "/units",
    validateRequest(
      z.object({
        unit: unitSchema
          .omit({
            unit_id: true,
          })
          .strict(),
      })
    ),
    unitsController.createUnit
  );

  // GET /api/units/:unitId
  router.get(
    "/units/:unitId",
    validateRequest(
      z.object({
        unitId: z.coerce.number().int().positive(),
      })
    ),
    unitsController.getUnit
  );

  // GET /api/units/:id/devices
  router.get(
    "/units/:unitId/devices",
    validateRequest(
      z.object({
        unitId: z.coerce.number().int().positive(),
      })
    ),
    unitsController.getDevicesByUnitId
  );

  // PUT /api/units/:unitId
  router.put(
    "/units/:unitId",
    validateRequest(
      z.object({
        unitId: z.coerce.number().int().positive(),
        unit: partialUnitSchema.strict(),
      })
    ),
    unitsController.updateUnit
  );

  // DELETE /api/units/:unitId
  router.delete(
    "/units/:unitId",
    validateRequest(
      z.object({
        unitId: z.coerce.number().int().positive(),
      })
    ),
    unitsController.deleteUnit
  );

  // Method Not Allowed - fallback for invalid methods per path
  router.all("/units", (req, res, next) => {
    if (req.method !== "GET" && req.method !== "POST") {
      return methodNotAllowed(req, res);
    }
    next();
  });

  router.all("/units/:unitId", (req, res, next) => {
    if (!["GET", "PUT", "DELETE"].includes(req.method)) {
      return methodNotAllowed(req, res);
    }
    next();
  });

  router.all("/units/:unitId/devices", (req, res, next) => {
    if (req.method !== "GET") {
      return methodNotAllowed(req, res);
    }
    next();
  });
}