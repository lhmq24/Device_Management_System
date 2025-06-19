const reportService = require("../services/maintenance_report.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

// POST /api/maintenance-reports
async function createReport(req, res, next) {
  try {
    const report = await reportService.createReport(req.validatedData);
    if (!report) {
      return next(new ApiError(400, "Invalid maintenance report data"));
    }
    return res.status(201).json(JSend.success({ report }));
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// GET /api/maintenance-reports
async function getReports(req, res, next) {
  try {
    const result = await reportService.getManyReports(req.validatedData);
    if (result.reports.length === 0) {
      return res.status(404).json(JSend.fail("No maintenance reports found"));   
    }           
    return res
    .status(200)
    .json(
      JSend.success({
        reports: result.reports,
        metadata: result.metadata,
      })
    );
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// GET /api/maintenance-reports/:id
async function getReport(req, res, next) {
  try {
    console.log("controller: " ,req.validatedData);
    const report = await reportService.getReportByPK(req.validatedData);
    if (!report) return next(new ApiError(404, "Maintenance report not found"));
    return res
      .status(200)
      .json(JSend.success({ report }));
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// PUT /api/maintenance-reports/:id
async function updateReport(req, res, next) {
  try {
    const updated = await reportService.updateReport(req.validatedData.id, req.validatedData.maintenanceReport);
    if (!updated)
      return next(new ApiError(404, "Maintenance report not found"));
    return res
      .status(200)
      .json(JSend.success({ report: updated }));
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

// DELETE /api/maintenance-reports/:id
async function deleteReport(req, res, next) {
  try {
    const deleted = await reportService.deleteReport(req.validatedData.id);
    if (!deleted)
      return next(new ApiError(404, "Maintenance report not found"));
    return res
      .status(200)
      .json(JSend.success());
  } catch (err) {
    return next(new ApiError(500, err.message));
  }
}

module.exports = {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
};
