const { faker } = require("@faker-js/faker");

const MAX_UNITS = 100; // Consistent with device_seed.js unit_id range

function createUnit() {
  return {
    unit_name: faker.company.name() + " Unit",
    unit_location: faker.location.streetAddress(true),
  };
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("maintenance_report").del();
  await knex("device").del();
  await knex("maintainer").del();
  await knex("unit").del();

  // Reset tables sequence
  await knex.raw("ALTER SEQUENCE unit_unit_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE device_device_id_seq RESTART WITH 1");
  await knex.raw("ALTER SEQUENCE maintainer_m_id_seq RESTART WITH 1");

  const units = [];
  for (let i = 1; i <= MAX_UNITS; i++) {
    units.push(createUnit());
  }
  await knex("unit").insert(units);
};
