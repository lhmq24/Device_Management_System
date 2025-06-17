const { faker } = require("@faker-js/faker");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {

  // Get existing unit IDs from the database
  const unitIds = await knex("unit").pluck("unit_id");

  function createDevice() {
    return {
      unit_id: faker.helpers.arrayElement(unitIds),
      device_name: faker.commerce.productName(),
      device_buy_date: faker.date.past(5).toISOString().split("T")[0],
      device_maintenance_interval: faker.number.int({ min: 1, max: 365 }),
      device_img: "/public/images/blank-profile-picture.png",
    };
  }

  const devices = Array.from({ length: 100 }, createDevice);
  await knex("device").insert(devices);
};
