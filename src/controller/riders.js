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

const getRidersRunInCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.riders.findMany({
      where: {
        category_id: Number(id),
      },
      include: {
        race_results: true,
        categories: {
          select: {
            name: true,
            lap: true,
          },
        },
      },
      orderBy: {
        total_waktu: "asc",
      },
    });

    res.json({
      message: "GET all riders success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const createRiderFinish = async (idbeacon, now) => {
  // GET UNIX TIME NOW
  // const { idbeacon } = req.params;

  try {
    await prisma.$transaction(async (tx) => {
      // 1. Read category id, rider id where id_beacon from mqtt
      const rider = await prisma.riders.findMany({
        where: {
          AND: [
            {
              id_beacon: Number(idbeacon),
            },
            {
              run: true,
            },
          ],
        },
        select: {
          id: true,
          category_id: true,
          total_waktu: true,
        },
      });

      if (rider.length === 0) {
        throw new Error("ID Beacon : " + idbeacon + " not found");
      }
      // 2. ... sum total_waktu and update to rider

      await prisma.riders.update({
        where: {
          id: rider[0].id,
        },
        data: {
          total_waktu: now,
        },
      });

      // 3. create riders race_result
      const race_result = await prisma.race_results.create({
        data: {
          rider_id: rider[0].id,
          category_id: rider[0].category_id,
          finish_time: now,
        },
      });
    });
  } catch (error) {
    prisma.$disconnect();
    throw new Error(error.message);
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
        id_beacon: Number(body.id_b),
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
        id_beacon: Number(body.id_b),
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
  getRidersRunInCategory,
  getRider,
  createNewRider,
  createRiderFinish,
  updateRider,
  deleteRider,
};
