const RidersModel = require("../models/riders");

const getAllRiders = async (req, res) => {
  try {
    const [data] = await RidersModel.getAllRiders();

    res.json({
      message: "GET all riders success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewRider = async (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.age ||
    !body.nationality ||
    !body.team_name ||
    !body.bib ||
    !body.vci_num ||
    !body.mac_no ||
    !body.run_lap ||
    !body.lap_no ||
    !body.run
  ) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    await RidersModel.createNewRider(body);
    res.status(201).json({
      message: "CREATE new rider success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateRider = async (req, res) => {
  const { idRider } = req.params;
  const { body } = req;
  try {
    await RidersModel.updateRider(body, idRider);
    res.json({
      message: "UPDATE rider success",
      data: {
        id: idRider,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteRider = async (req, res) => {
  const { idRider } = req.params;
  try {
    await RidersModel.deleteRider(idRider);
    res.json({
      message: "DELETE rider success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllRiders,
  createNewRider,
  updateRider,
  deleteRider,
};
