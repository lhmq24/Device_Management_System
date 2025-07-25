const knex = require("../database/knex");
// const Paginator = require("./Paginator");

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
  return data;
}

async function getManyReports(query) {
  const {
    // page = 1,
    // limit = 10,
    device_id,
    m_id,
    sort_by = "mr_date",
    order = "desc",
  } = query;

  // const paginator = new Paginator(page, limit);

  const results = await reportRepository()
    .where((builder) => {
      if (device_id) builder.where("device_id", device_id);
      if (m_id) builder.where("m_id", m_id);
    })
    .select(knex.raw("COUNT(*) OVER() AS record_count"), "*")
    .orderBy(sort_by, order)
    // .limit(paginator.limit)
    // .offset(paginator.offset);

  // const totalRecords = results[0]?.record_count ?? 0;
  const reports = results.map((r) => ({ ...r, record_count: undefined }));

  return {
    // metadata: paginator.getMetadata(totalRecords),
    reports,
  };
}

async function getReportByPK(validatedData) {
  const { device_id, m_id, mr_date } = validatedData;
  return reportRepository().where({ device_id, m_id, mr_date }).first();
}

async function updateReport(payload) {
 
  const { device_id, m_id, mr_date } = payload;

  const existing = await getReportByPK(payload);
  if (!existing) return null;

  const data = readReportData(payload);

  if (Object.keys(data).length > 0) {
    await reportRepository().where({ device_id, m_id, mr_date }).update(data);
    return { ...existing, ...data };
  }

  return existing;
}

async function deleteReport(payload) {
  const report = await getReportByPK(payload);
  const { device_id, m_id, mr_date } = payload;
  if (!report) return null;

  await reportRepository().where({ device_id, m_id, mr_date }).del();
  return report;
}

module.exports = {
  createReport,
  getManyReports,
  getReportByPK,
  updateReport,
  deleteReport,
};
