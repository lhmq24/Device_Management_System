const { faker } = require("@faker-js/faker");

const MAX_MAINTAINERS = 50;

function createMaintainer() {
  return {
    m_name: faker.person.fullName(),
    m_phone: faker.phone.number(),
    m_email: faker.internet.email({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
    }),
  };
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {

  const maintainers = [];
  for (let i = 1; i <= MAX_MAINTAINERS; i++) {
    maintainers.push(createMaintainer());
  }
  await knex("maintainer").insert(maintainers);
};
