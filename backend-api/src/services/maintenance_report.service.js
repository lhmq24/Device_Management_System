const knex = require("../database/knex");
// const Paginator = require("./Paginator");

function toPlainDateString(d) {
  return d instanceof Date ? d.toISOString().split("T")[0] : d;
}

/**
 * @import {
 * maintenanceReportSchema,
 * partialMaintenanceReportSchema,
 * } from '../schemas/maintenanceReport.schema';
 * @typedef {z.infer<typeof maintenanceReportSchema>} MaintenanceReport
 * @typedef {z.infer<typeof partialMaintenanceReportSchema>} PartialMaintenanceReport
 */

function reportRepository() {
  return knex("maintenance_report");
}

function readReportData(payload) {
  return {
    ...(payload.device_id && { device_id: payload.device_id }),
    ...(payload.m_id && { m_id: payload.m_id }),
    ...(payload.mr_date && { mr_date: payload.mr_date }),
    ...(payload.mr_note && { mr_note: payload.mr_note }),
  };
}

async function createReport(payload) {
  const data = readReportData(payload);
  await reportRepository().insert(data);
  return {
    ...data,
    mr_date: toPlainDateString(data.mr_date), // Ensure clean return
  };
}

async function getManyReports(query) {
  const { device_id, m_id, sort_by = "mr_date", order = "desc" } = query;

  const results = await reportRepository()
    .where((builder) => {
      if (device_id) builder.where("device_id", device_id);
      if (m_id) builder.where("m_id", m_id);
    })
    .select(knex.raw("COUNT(*) OVER() AS record_count"), "*")
    .orderBy(sort_by, order);
  const reports = results.map((r) => ({
    ...r,
    record_count: undefined,
    mr_date: toPlainDateString(r.mr_date),
  }));

  return { reports };
}

async function getReportByPK(validatedData) {
  const { device_id, m_id, mr_date } = validatedData;

  const report = await reportRepository()
    .where({ device_id, m_id, mr_date })
    .first();

  return report
    ? {
        ...report,
        mr_date: toPlainDateString(report.mr_date),
      }
    : null;
}

async function updateReport(payload) {
  const { device_id, m_id, mr_date } = payload;

  const existing = await getReportByPK(payload);
  if (!existing) return null;

  const data = readReportData(payload);

  if (Object.keys(data).length > 0) {
    await reportRepository().where({ device_id, m_id, mr_date }).update(data);
    return {
      ...existing,
      ...data,
      mr_date: toPlainDateString(data.mr_date || existing.mr_date),
    };
  }

  return {
    ...existing,
    mr_date: toPlainDateString(existing.mr_date),
  };
}

async function deleteReport(payload) {
  const { device_id, m_id, mr_date } = payload;

  const report = await getReportByPK(payload);
  if (!report) return null;

  await reportRepository().where({ device_id, m_id, mr_date }).del();

  return {
    ...report,
    mr_date: toPlainDateString(report.mr_date),
  };
}

module.exports = {
  createReport,
  getManyReports,
  getReportByPK,
  updateReport,
  deleteReport,
};
