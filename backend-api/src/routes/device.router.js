const express = require("express");
const { z } = require("zod");

const devicesController = require("../controllers/device.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");
const { validateRequest } = require("../middlewares/validator.middlewares");
const { deviceImgUpload } = require("../middlewares/img-upload.middlewares");
const {
  deviceSchema,
  partialDeviceSchema,
} = require("../schemas/device.schema");

const router = express.Router();
module.exports.setup = (app) => {
  app.use("/api", router);
  // GET /api/devices
  router.get(
    "/devices",
    validateRequest(
      z
        .object({
          device_name: z.string().max(255).optional(),
          page: z.coerce.number().nonnegative().default(1),
          limit: z.coerce.number().nonnegative().default(5),
        })
        .strict()
    ),
    devicesController.getManyDevices
  );

  // POST /api/devices
    router.post(
        "/devices",
    [
      deviceImgUpload,
      validateRequest(
        z
          .object({
            device: deviceSchema
              .omit({
                device_id: true,
              })
              .strict(),
            imgFile: z
              .union([
                z.undefined(),
                z.null(),
                z.object({
                  fieldname: z.literal("imgFile"),
                  originalname: z.string(),
                  encoding: z.string(),
                  mimetype: z.string(),
                  destination: z.string(),
                  filename: z.string(),
                  path: z.string(),
                  size: z.number(),
                }),
              ])
              .optional(),
          })
          .strict()
      ),
    ],
    devicesController.createDevice
  );

  // GET /api/devices/:id
  router.get(
    "/devices/:id",
    validateRequest(
      z
        .object({
          id: z.coerce.number().int().nonnegative(),
        })
        .strict()
    ),
    devicesController.getDeviceById
  );

    // PUT /api/devices/:id
    router.put( 
        "/devices/:id",
        [
        deviceImgUpload,
        validateRequest(
            z
                .object({
                device: partialDeviceSchema
                    .omit({
                    device_id: true,
                    })
                    .strict(),
                imgFile: z
                    .union([
                    z.undefined(),
                    z.null(),
                    z.object({
                        fieldname: z.literal("imgFile"),
                        originalname: z.string(),
                        encoding: z.string(),
                        mimetype: z.string(),
                        destination: z.string(),
                        filename: z.string(),
                        path: z.string(),
                        size: z.number(),
                    }),
                    ])
                    .optional(),
                })
                .strict()
        ),
        ],
        devicesController.updateDevice
    );

  // DELETE /api/devices/:id
    router.delete(
        "/devices/:id",
        validateRequest(
        z
            .object({
            id: z.coerce.number().int().nonnegative(),
            })
            .strict()
        ),
        devicesController.deleteDevice
    );

  router.all("/:id", methodNotAllowed);
}
