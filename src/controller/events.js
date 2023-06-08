const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getEvents = async (req, res) => {
  try {
    const response = await prisma.events.findMany();
    res.status(200).json({
      message: "GET all events success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
  }
};

const getEvent = async (req, res) => {
  const { idEvent } = req.params;
  try {
    const data = await prisma.events.findUnique({
      where: {
        id: Number(idEvent),
      },
    });

    res.json({
      message: "GET event success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
  }
};

const createNewEvent = async (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.location ||
    !body.commisioner ||
    !body.race_director ||
    !body.type
  ) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    const response = await prisma.events.create({
      data: {
        ...body,
        distance: Number(body.distance),
        registration_fee: Number(body.registration_fee),
      },
    });

    res.status(201).json({
      message: "CREATE new event success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  const { idEvent } = req.params;
  const { body } = req;

  if (
    !body.name ||
    !body.location ||
    !body.commisioner ||
    !body.race_director ||
    !body.type
  ) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    const event = await prisma.events.update({
      where: {
        id: Number(idEvent),
      },
      data: {
        ...body,
        distance: Number(body.distance),
        registration_fee: Number(body.registration_fee),
      },
    });
    res.json({
      message: "UPDATE event success",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  const { idEvent } = req.params;
  try {
    const event = await prisma.events.delete({
      where: {
        id: Number(idEvent),
      },
    });

    res.json({
      message: "DELETE event success",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

module.exports = {
  getEvents,
  getEvent,
  createNewEvent,
  updateEvent,
  deleteEvent,
};
