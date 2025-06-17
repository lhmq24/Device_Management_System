const { faker } = require("@faker-js/faker");

const NUM_REPORTS_TO_SEED = 200;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  
  // Get real IDs from the DB
  const deviceIds = await knex("device").pluck("device_id");
  const maintainerIds = await knex("maintainer").pluck("m_id");

  const reports = [];

  for (let i = 0; i < NUM_REPORTS_TO_SEED; i++) {
    reports.push({
      device_id: faker.helpers.arrayElement(deviceIds),
      m_id: faker.helpers.arrayElement(maintainerIds),
      mr_date: faker.date.recent({ days: 365 }).toISOString().split("T")[0],
      mr_note: faker.datatype.boolean(0.8) ? faker.lorem.sentence() : null,
    });
  }

  await knex("maintenance_report").insert(reports);
};
