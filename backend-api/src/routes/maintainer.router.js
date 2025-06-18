const express = require("express");
const { z } = require("zod");

const maintainersController = require("../controllers/maintainer.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const { validateRequest } = require("../middlewares/validator.middlewares");
const {
  maintainerSchema,
  partialMaintainerSchema,
} = require("../schemas/maintainer.schema");

const router = express.Router();
module.exports.setup = (app) => {
    app.use("/api", router);
    // GET /api/maintainers
    router.get(
      "/maintainers",
      validateRequest(
        z
          .object({
            search: z.string().max(255).optional(),
            page: z.coerce.number().nonnegative().default(1),
            limit: z.coerce.number().nonnegative().default(5),
          })
          .strict()
      ),
      maintainersController.getMaintainers
    );
    
    // POST /api/maintainers
    router.post(
        "/maintainers",
        validateRequest(
        z.object({
            maintainer: maintainerSchema
            .omit({
                m_id: true,
            })
            .strict(),
        })
        ),
        maintainersController.createMaintainer
    );
    
    // GET /api/maintainers/:id
    router.get(
      "/maintainers/:id",
      validateRequest(
        z.object({
          id: z.coerce.number().int().positive(),
        })
      ),
      maintainersController.getMaintainer
    );
    
    // PUT /api/maintainers/:id
    router.put(
        "/maintainers/:id",
        validateRequest(
        z.object({
            id: z.coerce.number().int().positive(),
            maintainer: partialMaintainerSchema.strict(),
        })
        ),
        maintainersController.updateMaintainer
    );
    
    // DELETE /api/maintainers/:id
    router.delete(
        "/maintainers/:id",
        validateRequest(
        z.object({
            id: z.coerce.number().int().positive(),
        })
        ),
        maintainersController.deleteMaintainer
    );
    
    // Method Not Allowed for all other methods
    router.all("/maintainers", (req, res, next) => {
      if (!["GET", "POST"].includes(req.method))
        return methodNotAllowed(req, res);
      next();
    });

    router.all("/maintainers/:id", (req, res, next) => {
      if (!["GET", "PUT", "DELETE"].includes(req.method))
        return methodNotAllowed(req, res);
      next();
    });
    }