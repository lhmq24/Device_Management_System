const devicesService = require("../services/device.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

const DEFAULT_IMAGE = "/public/images/blank-profile-picture.png";

function getImagePath(file) {
  return file ? `/public/uploads/${file.filename}` : DEFAULT_IMAGE;
}

// POST /api/devices
async function createDevice(req, res, next) {
  try {
    const deviceData = {
      ...req.validatedData,
      device_img: getImagePath(req.file),
    };
    const device = await devicesService.createDevice(deviceData);
    if(!device) {
      return next(new ApiError(400, "Invalid device data"))
    }
    return res
      .status(201)
      .json(JSend.success( device ));
  } catch (error) {
    return next(new ApiError(500, "Internal Server Error: " + error.message));
  }
}

// GET /api/devices
async function getDevicesByFilter(req, res, next) {
  // if req query has device_name, use it to filter devices
  if (req.validatedData.device_name) {  
    try {
      const devices = await devicesService.getDevicesByName(req.query.device_name);
      if (devices.length === 0) {
        return res.status(404).json(JSend.fail("No devices found"));
      }
      return res.status(200).json(JSend.success({ devices }));
    } catch (error) {
      console.error(error);
      return next(new ApiError(500, "Internal Server Error"));
    }
  }
  try {
    const result = await devicesService.getManyDevices(req.query);
    if(result.devices.length === 0) {
      return res.status(404).json(JSend.fail("No devices found"));
    }
    return res
    .status(200)
    .json(
      JSend.success({
        devices: result.devices,
        metadata: result.metadata,
      })
    );
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "Internal Server Error"));
  }
}

// GET /api/devices/:id
async function getDevice(req, res, next) {
  try {
    const { id } = req.validatedData;
    const device = await devicesService.getDeviceById(id);
    if (!device) {
      return next(new ApiError(404, "Device not found"));
    }

    return res.status(200).json(JSend.success(device));
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "Internal Server Error"));
  }
}

// PUT /api/devices/:id
async function updateDevice(req, res, next) {
  try {    
    const updateData = {
      ...req.validatedData,
      ...req.body,
      ...(req.file && { device_img: getImagePath(req.file) }),
    };

    const updated = await devicesService.updateDevice(updateData);

    if (!updated) {
      return next(new ApiError(404, "Device not found"));
    }

    return res.status(200).json(JSend.success( updated ));
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "Internal Server Error"));
  }
}

// DELETE /api/devices/:id
async function deleteDevice(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await devicesService.deleteDevice(id);

    if (!deleted) {
      return next(new ApiError(404, "Device not found"));
    }

    return res.status(200).json(JSend.success());
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "Internal Server Error"));
  }
}

module.exports = {
  createDevice,
  getDevicesByFilter,
  getDevice,
  updateDevice,
  deleteDevice,
};
