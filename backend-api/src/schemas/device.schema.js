const { z } = require("zod");

const deviceSchema = z.object({
  device_id: z.coerce.number().int().nonnegative(),
  unit_id: z.coerce.number().int().nonnegative().optional(),
  name: z.string().max(255),
  buy_date: z.coerce.date().optional(),
  maintenance_interval_date: z.number().int().nonnegative(),
  device_img: z.string().max(255).optional(),
  //imgFile is optional and can be undefined or null, not included in database entity
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
});
// Mostly used for JSDoc annotations
const partialdeviceSchema = deviceSchema.partial();

module.exports = {
  deviceSchema,
  partialdeviceSchema,
};
