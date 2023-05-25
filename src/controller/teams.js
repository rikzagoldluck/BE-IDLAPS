const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getTeams = async (req, res) => {
  try {
    const response = await prisma.teams.findMany();

    res.status(200).json({
      message: "GET all teams success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
  }
};

const getTeam = async (req, res) => {
  const { idTeam } = req.params;
  try {
    const data = await prisma.teams.findUnique({
      where: {
        id: Number(idTeam),
      },
    });

    res.json({
      message: "GET team success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
  }
};

const createNewTeam = async (req, res) => {
  const { body } = req;

  if (!body.name || !body.nationality) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    const response = await prisma.teams.create({
      data: {
        ...body,
      },
    });

    res.status(201).json({
      message: "CREATE new team success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const updateTeam = async (req, res) => {
  const { idTeam } = req.params;
  const { body } = req;

  if (!body.name || !body.nationality) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    const team = await prisma.teams.update({
      where: {
        id: Number(idTeam),
      },
      data: {
        ...body,
      },
    });
    res.json({
      message: "UPDATE team success",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const deleteTeam = async (req, res) => {
  const { idTeam } = req.params;
  try {
    const team = await prisma.teams.delete({
      where: {
        id: Number(idTeam),
      },
    });

    res.json({
      message: "DELETE team success",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

module.exports = {
  getTeams,
  getTeam,
  createNewTeam,
  updateTeam,
  deleteTeam,
};
