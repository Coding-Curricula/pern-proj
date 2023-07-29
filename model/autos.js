const Auto = require("./auto.model");

// get all autos
const getAllAutos = async () => {
  const result = await Auto.findAll();
  return result;
};

// get an auto by id
const getAutoById = async (id) => {
  const result = await Auto.findAll({
    where: {
      id,
    },
  });

  return result;
};

// create a new auto
const createAuto = async ({ year, brand, model }) => {
  try {
    const result = await Auto.create({
      year,
      brand,
      model,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateAuto = async ({ id, year, brand, model }) => {
  try {
    const auto = await getAutoById(id);

    if (!auto || auto.length === 0) {
      throw new Error(`Unable to find auto with ID: ${id}`);
    }

    await Auto.update(
      {
        year,
        brand,
        model,
      },
      {
        where: {
          id,
        },
      }
    );

    return await getAutoById(id);
  } catch (err) {
    throw err;
  }
};

const deleteAuto = async (id) => {
  const autoToDelete = await getAutoById(id);

  if (!autoToDelete || autoToDelete.length === 0) {
    throw new Error(`Could not find an auto with the ID ${id} to delete`);
  }

  await Auto.destroy({
    where: {
      id,
    },
  });

  return autoToDelete[0];
};

module.exports = {
  getAllAutos,
  getAutoById,
  createAuto,
  updateAuto,
  deleteAuto,
};
