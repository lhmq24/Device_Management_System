const unitService = require("../services/unit.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

// POST /api/units
async function createUnit(req, res, next) {
  try {
    const unit = await unitService.createUnit(req.validatedData);
    if (!unit) {
      return next(new ApiError(400, "Invalid unit data"));
    }
    return res.status(201).json(JSend.success(unit));
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// GET /api/units
async function getUnits(req, res, next) {
  try {
    const result = await unitService.getManyUnits(req.query);
    if (result.units.length === 0) {
      return res.status(404).json(JSend.fail("No units found"));
    }
    return res
    .status(200)
    .json(
      JSend.success({
        units: result.units,
        metadata: result.metadata,
      })
    );
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// GET /api/units/:id
async function getUnit(req, res, next) {
  try {
    const unit = await unitService.getUnitById(req.validatedData.unitId);
    if (!unit) return next(new ApiError(404, "Unit not found"));
    return res
    .status(200)
    .json(JSend.success({ unit }));
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// PUT /api/units/:id
async function updateUnit(req, res, next) {
  try {
    const updated = await unitService.updateUnit(req.validatedData);
    if (!updated) return next(new ApiError(404, "Unit not found"));
    return res
    .status(200)
    .json(JSend.success(updated));
  } catch (err) {   
    return next(new ApiError(500, err.message));
  }
}

// DELETE /api/units/:id
async function deleteUnit(req, res, next) {
  try {
    const deleted = await unitService.deleteUnit(req.validatedData.unitId);
    if (!deleted) return next(new ApiError(404, "Unit not found"));
    return res
    .status(200)
    .json(JSend.success());
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// GET /api/units/:id/devices
async function getDevicesByUnitId(req, res, next) {
  try {
    const devices = await unitService.getDevicesByUnitId(req.validatedData.unitId);
    if (devices.length === 0) {
      return res.status(404).json(JSend.fail("No devices found for this unit"));
    }
    return res
    .status(200)
    .json(JSend.success({ devices }));
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

module.exports = {
  createUnit,
  getUnits,
  getUnit,
  updateUnit,
  deleteUnit,
  getDevicesByUnitId,
};
