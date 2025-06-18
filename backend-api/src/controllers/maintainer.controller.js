const maintainerService = require("../services/maintainer.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

// POST /api/maintainers
async function createMaintainer(req, res, next) {
  try {
    const maintainer = await maintainerService.createMaintainer(
      req.validatedData
    );
    if (!maintainer) {
      return next(new ApiError(400, "Invalid maintainer data"));
    }
    return res.status(201).json(JSend.success({ maintainer }));
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// GET /api/maintainers
async function getMaintainers(req, res, next) {
  try {
    const result = await maintainerService.getManyMaintainers(req.query);
    if (result.maintainers.length === 0) {
      return res.status(404).json(JSend.fail("No maintainers found"));
    }
    return res
    .status(200)
    .json(
      JSend.success({
        maintainers: result.maintainers,
        metadata: result.metadata,
      })
    );
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// GET /api/maintainers/:id
async function getMaintainer(req, res, next) {
  try {
    const maintainer = await maintainerService.getMaintainerById(req.params.id);
    if (!maintainer) return next(new ApiError(404, "Maintainer not found"));
    return res
      .status(200)
      .json(JSend.success({ maintainer }));
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// PUT /api/maintainers/:id
async function updateMaintainer(req, res, next) {
  try {
    const updated = await maintainerService.updateMaintainer(
      req.params.id,
      req.body
    );
    if (!updated) return next(new ApiError(404, "Maintainer not found"));
    return res
      .status(200)
      .json(JSend.success({ maintainer: updated }));
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// DELETE /api/maintainers/:id
async function deleteMaintainer(req, res, next) {
  try {
    const deleted = await maintainerService.deleteMaintainer(req.params.id);
    if (!deleted) return next(new ApiError(404, "Maintainer not found"));
    return res
      .status(200)
      .json(JSend.success());
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

module.exports = {
  createMaintainer,
  getMaintainers,
  getMaintainer,
  updateMaintainer,
  deleteMaintainer,
};
