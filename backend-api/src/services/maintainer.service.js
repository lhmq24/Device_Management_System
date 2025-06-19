const knex = require("../database/knex");
const Paginator = require("./Paginator");

/**
 * @import {
 * maintainerSchema,
 * partialMaintainerSchema,
 * } from '../schemas/maintainer.schema';
 * @typedef {z.infer<typeof maintainerSchema>} Maintainer
 * @typedef {z.infer<typeof partialMaintainerSchema>} PartialMaintainer
 */

function maintainerRepository() {
  return knex("maintainer");
}

function readMaintainerData(payload) {
  return {
    ...(payload.m_name && { m_name: payload.m_name }),
    ...(payload.m_email && { m_email: payload.m_email }),
    ...(payload.m_phone && { m_phone: payload.m_phone }),
  };
}

async function createMaintainer(payload) {
  const data = readMaintainerData(payload);
  const [m_id] = await maintainerRepository().insert(data).returning("m_id");
  return { m_id: m_id.m_id, ...data };
}

async function getManyMaintainers(query) {
  const {
    page = 1,
    limit = 10,
    search,
    sort_by = "m_name",
    order = "asc",
  } = query;
  const paginator = new Paginator(page, limit);

  const results = await maintainerRepository()
    .where((builder) => {
      if (search) {
        builder
          .where("m_name", "ilike", `%${search}%`)
          .orWhere("m_email", "ilike", `%${search}%`)
          .orWhere("m_phone", "ilike", `%${search}%`);
      }
    })
    .select(knex.raw("COUNT(*) OVER() AS record_count"), "*")
    .orderBy(sort_by, order)
    .limit(paginator.limit)
    .offset(paginator.offset);

  const totalRecords = results[0]?.record_count ?? 0;
  const maintainers = results.map((r) => ({ ...r, record_count: undefined }));

  return {
    metadata: paginator.getMetadata(totalRecords),
    maintainers,
  };
}

async function getMaintainerById(id) {
  return maintainerRepository().where("m_id", id).first();
}

async function updateMaintainer(payload) {
  const maintainer = await getMaintainerById(payload.id);
  if (!maintainer) return null;

  const data = readMaintainerData(payload);
  if (Object.keys(data).length > 0) {
    await maintainerRepository().where("m_id", payload.id).update(data);
    return { m_id: payload.id, ...data };
  }

  return maintainer;
}

async function deleteMaintainer(id) {
  const maintainer = await getMaintainerById(id);
  if (!maintainer) return null;

  await maintainerRepository().where("m_id", id).del();
  return maintainer;
}

module.exports = {
  createMaintainer,
  getManyMaintainers,
  getMaintainerById,
  updateMaintainer,
  deleteMaintainer,
};
