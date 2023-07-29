const client = require("./client");

// function to get all autos
async function getAllAutos() {
  try {
    const { rows } = await client.query(`
            SELECT *
            FROM autos;
            `);

    return rows;
  } catch (error) {
    throw error;
  }
}

// function to get an auto by id
async function getAutoById(id) {
  try {
    const {
      rows: [auto],
    } = await client.query(
      `
            SELECT *
            FROM autos
            WHERE id=$1;
            `,
      [id]
    );

    return auto;
  } catch (error) {
    throw error;
  }
}

// function to create a new auto
async function createAuto({ year, brand, model }) {
  try {
    const {
      rows: [auto],
    } = await client.query(
      `
            INSERT INTO autos(year, brand, model, created_at)
            VALUES ($1, $2, $3, NOW());
            `,
      [year, brand, model]
    );

    return auto;
  } catch (error) {
    throw error;
  }
}

// function to update an auto
async function updateAuto({ id, year, brand, model }) {
  try {
    const {
      rows: [auto],
    } = await client.query(
      `
            UPDATE autos
            SET year=$2, brand=$3, model=$4
            WHERE id=$1
            RETURNING *;
            `,
      [id, year, brand, model]
    );

    return auto;
  } catch (error) {
    throw error;
  }
}

// function to delete an auto
async function deleteAuto(id) {
  try {
    const {
      rows: [auto],
    } = await client.query(
      `
            DELETE FROM autos
            WHERE id=$1
            RETURNING *;
            `,
      [id]
    );

    return auto;
  } catch (error) {
    throw error;
  }
}

// export modules
module.exports = {
  getAllAutos,
  getAutoById,
  createAuto,
  updateAuto,
  deleteAuto,
};
