const { unlink } = require("node:fs");
const knex = require("../database/knex");
const Paginator = require("./Paginator");

/**
 * @import { z } from 'zod';
 * @import {
 * deviceSchema,
 * partialdeviceSchema,
 * } from '../schemas/device.schema';
 * @typedef {z.infer<typeof deviceSchema>} Device
 * @typedef {z.infer<typeof partialdeviceSchema>} PartialDevice
 */
function deviceRepository() {
  return knex("device");
}
/**
 *
 * @param {PartialDevice} payload
 * @returns {PartialDevice}
 */
function readDeviceData(payload) {
  return {
    ...(payload.device_id && { device_id: payload.device_id }),
    ...(payload.unit_id && { unit_id: payload.unit_id }),
    ...(payload.device_name && { device_name: payload.device_name }),
    ...(payload.device_buy_date && { device_buy_date: payload.device_buy_date }),
    ...(payload.device_maintenance_interval && {
      device_maintenance_interval: payload.device_maintenance_interval,
    }),
    ...(payload.device_img && { device_img: payload.device_img }),
    // imgFile is not included in the database entity, so we don't include it here
  };
}

/**
 * @param {Object} payload
 * @returns {Promise<Device>}
 */
async function createDevice(payload) {
  const deviceData = readDeviceData(payload);
  const insertedRow = await deviceRepository().insert(deviceData).returning("device_id");
  return { device_id: insertedRow.device_id, ...deviceData }; 
}

async function getManyDevices(query) {
  const { page = 1, limit = 5 } = query;

  if (page < 1 || limit < 1) {
    throw new Error("Invalid page or limit value. Both must be greater than 0.");
  }

  if (isNaN(page) || isNaN(limit)) {
    throw new Error("Page and limit must be valid numbers.");
  }

  if (!Number.isInteger(page) || !Number.isInteger(limit)) {
    throw new Error("Page and limit must be integers.");
  }

  const paginator = new Paginator(page, limit);

  const results = await deviceRepository()
    .select(
      knex.raw("COUNT(device_id) OVER() AS record_count"),
      "device_id",
      "unit_id",
      "device_name",
      "device_buy_date",
      "device_maintenance_interval",
      "device_img"
    )
    .orderBy("device_id", "asc")
    .limit(paginator.limit)
    .offset(paginator.offset);

  const totalRecords = results[0]?.record_count ?? 0;

  const devices = results.map((result) => {
    result.record_count = undefined;
    return result;
  });

  return {
    metadata: paginator.getMetadata(totalRecords),
    devices,
  };
}


async function getDeviceById(id) {
  console.log(deviceRepository().where("device_id", id).select("*").first().toSQL().toNative());
  return deviceRepository().where("device_id", id).select("*").first();
}

async function getDevicesByName(device_name) {
  return deviceRepository().where("device_name", device_name).select("*");
}

/**
 * @param {Number} deviceId
 * @param {PartialDevice} updateData
 */
async function updateDevice(id, updateData) {
  const deviceFromDb = await deviceRepository()
    .where("device_id", id)
    .select("*")
    .first();

  if (!deviceFromDb) {
    return null;
  }

  const deviceData = readDeviceData(updateData);

  if (Object.keys(deviceData).length > 0) {
    await deviceRepository().where("device_id", id).update(deviceData);

    if (
      deviceData.device_img &&
      deviceFromDb.device_img && // An old image existed
      deviceData.device_img !== deviceFromDb.device_img && // The images are different
      deviceFromDb.device_img.startsWith("/public/uploads") // The old image is eligible for deletion
    ) {
      unlink(`.${deviceFromDb.device_img}`, () => {}); // Delete the OLD image
    }

    return { ...deviceFromDb, ...deviceData }; // Return the merged object using the fetched device state
  }

  return deviceFromDb; // Return the original device if no valid updateData fields
}

async function deleteDevice(id) {
  const deletedDevice = await deviceRepository()
    .where("device_id", id)
    .select("device_img")
    .first();

  if (!deletedDevice) {
    return null;
  }

  await deviceRepository().where("device_id", id).del();

  if (
    deletedDevice.device_img &&
    deletedDevice.device_img.startsWith("/public/uploads")
  ) {
    await unlink(`.${deletedDevice.device_img}`);
  }

  return deletedDevice;
}

// async function deleteAllDevices() {
//   const devices = await deviceRepository().select("device_img");
//   await deviceRepository().del();

//   devices.forEach((device) => {
//     if (device.device_img && device.device_img.startsWith("/public/uploads")) {
//       unlink(`.${device.device_img}`, () => {});
//     }
//   });
// }

// Define functions for accessing the database
module.exports = {
  // Export defined functions
  createDevice,
  getManyDevices,
  getDeviceById,
  getDevicesByName,
  updateDevice,
  deleteDevice,
  // deleteAllDevices,
};
