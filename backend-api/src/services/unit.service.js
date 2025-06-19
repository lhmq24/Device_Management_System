const knex = require("../database/knex");
const Paginator = require("./Paginator");

/**
 * @import { z } from 'zod';
 * @import {
 * unitSchema,
 * partialUnitSchema,
 * } from '../schemas/unit.schema';
 * @typedef {z.infer<typeof unitSchema>} Unit
 * @typedef {z.infer<typeof partialUnitSchema>} PartialUnit
 */
function unitRepository() {
  return knex("unit");
}

function readUnitData(payload) {
  return {
    ...(payload.unit_name && { unit_name: payload.unit_name }),
    ...(payload.unit_location && { unit_location: payload.unit_location }),
  };
}

async function createUnit(payload) {
  const data = readUnitData(payload);
  const [unit_id] = await unitRepository().insert(data).returning("unit_id");
  return { unit_id, ...data };
}

async function getManyUnits(query) {
  const {
    page = 1,
    limit = 10,
    search,
    sort_by = "unit_name",
    order = "asc",
  } = query;
  const paginator = new Paginator(page, limit);

  const results = await unitRepository()
    .where((builder) => {
      if (search) {
        builder
          .where("unit_name", "ilike", `%${search}%`)
          .orWhere("unit_location", "ilike", `%${search}%`);
      }
    })
    .select(knex.raw("COUNT(*) OVER() AS record_count"), "*")
    .orderBy(sort_by, order)
    .limit(paginator.limit)
    .offset(paginator.offset);

  const totalRecords = results[0]?.record_count ?? 0;
  const units = results.map((r) => ({ ...r, record_count: undefined }));

  return {
    metadata: paginator.getMetadata(totalRecords),
    units,
  };
}

async function getUnitById(id) {
  console.log("getUnitById", id);
  return unitRepository().where("unit_id", id).first();
}

async function getDevicesByUnitId(unit_id) {
  return knex("device").where("unit_id", unit_id).select("*");
}

async function updateUnit(id, payload) {
  const unit = await getUnitById(id);
  if (!unit) return null;

  const data = readUnitData(payload);
  if (Object.keys(data).length > 0) {
    await unitRepository().where("unit_id", id).update(data);
    return { ...unit, ...data };
  }

  return unit;
}

async function deleteUnit(id) {
  const unit = await getUnitById(id);
  if (!unit) return null;

  await unitRepository().where("unit_id", id).del();
  return unit;
}

module.exports = {
  createUnit,
  getManyUnits,
  getUnitById,
  getDevicesByUnitId,
  updateUnit,
  deleteUnit,
};
