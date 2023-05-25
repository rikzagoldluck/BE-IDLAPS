const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getRiders = async (req, res) => {
  try {
    const response = await prisma.riders.findMany({
      include: {
        events: {
          select: {
            name: true,
          },
        },
        teams: {
          select: {
            name: true,
          },
        },
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "GET all riders success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
  }
};

const getRider = async (req, res) => {
  const { idRider } = req.params;
  try {
    const data = await prisma.riders.findUnique({
      where: {
        id: Number(idRider),
      },
    });

    res.json({
      message: "GET rider success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
  }
};

const createNewRider = async (req, res) => {
  const { body } = req;

  if (!body.name || !body.nationality || !body.mac_no) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    const response = await prisma.riders.create({
      data: {
        ...body,
        age: Number(body.age),
        team_id: Number(body.team_id),
        id_b: Number(body.id_b),
        run_lap: Number(body.run_lap),
        lap_no: Number(body.lap_no),
        event_id: Number(body.event_id),
        category_id: Number(body.category_id),
      },
    });

    res.status(201).json({
      message: "CREATE new rider success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const updateRider = async (req, res) => {
  const { idRider } = req.params;
  const { body } = req;

  if (!body.name || !body.nationality || !body.mac_no) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    const rider = await prisma.riders.update({
      where: {
        id: Number(idRider),
      },
      data: {
        ...body,
        age: Number(body.age),
        team_id: Number(body.team_id),
        id_b: Number(body.id_b),
        run_lap: Number(body.run_lap),
        lap_no: Number(body.lap_no),
        event_id: Number(body.event_id),
        category_id: Number(body.category_id),
      },
    });
    res.json({
      message: "UPDATE rider success",
      data: rider,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const deleteRider = async (req, res) => {
  const { idRider } = req.params;
  try {
    const rider = await prisma.riders.delete({
      where: {
        id: Number(idRider),
      },
    });

    res.json({
      message: "DELETE rider success",
      data: rider,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

module.exports = {
  getRiders,
  getRider,
  createNewRider,
  updateRider,
  deleteRider,
};
