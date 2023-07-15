const { PrismaClient } = require("@prisma/client");
const { getUtility } = require("./utilities");

const prisma = new PrismaClient();

const getRiders = async (req, res) => {
  try {
    const response = await prisma.riders.findMany({
      include: {
        categories: {
          select: {
            name: true,
            // include: {
            events: { select: { name: true } },
            // },
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
            start_time: true,
          },
        },
      },
    });

    res.json({
      message: "GET all riders success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const calculateMinuteGap = (timestamp1, timestamp2) => {
  const minuteGap = Math.abs(timestamp2 - timestamp1) / (1000 * 60);
  return minuteGap;
};

const record = async (mac) => {
  try {
    await prisma.$transaction(async (tx) => {
      // AMBIL SEMUA YANG RUNNING
      const riderRun = await prisma.riders.findMany({
        where: {
          AND: [
            {
              beacon: {
                tag_id: mac,
              },
            },
            { run: true },
          ],
        },
        select: {
          id: true,
          category_id: true,
          categories: {
            select: {
              run: true,
              start_time: true,
              start_sch: true,
              lap: true,
            },
          },
        },
      });

      

      if (riderRun.length < 1) {
        throw new Error("Rider with MAC: " + mac + " not run");
      }

      const lastRecord = await prisma.race_results.findFirst({
        select: {
          finish_time: true,
        },
        where: {
          rider_id: riderRun[0].id,
          category_id: riderRun[0].category_id,
        },
        orderBy: {
          result_id: "desc",
        },
        take: 1,
      });

      let lastRecordTime = parseInt(riderRun[0].categories.start_time);
      if (lastRecord !== null) {
        lastRecordTime = parseInt(lastRecord.finish_time);
      }

      const interval = await prisma.utilities.findFirst({
        where: {
          name: {
            equals: "interval",
          },
        },
        select: {
          value: true,
        },
      });
      const now = new Date().getTime();

      if (calculateMinuteGap(lastRecordTime, now) < parseInt(interval.value)) {
        throw new Error("Rider with MAC: " + mac + " has been recorded");
      }

      const race_result = await prisma.race_results.create({
        data: {
          rider_id: riderRun[0].id,
          category_id: riderRun[0].category_id,
          finish_time: now.toString(),
        },
      });

      // IF RACE RESULT LENGTH IS SAME AS LAP FROM CATEGORY THEN UPDATE RIDER RUN TO FALSE AND SET NOTE TO FINISHER
      const lap_count = await prisma.race_results.count({
        where: {
          rider_id: riderRun[0].id,
          category_id: riderRun[0].category_id,
        },
      });

      console.log("lap count: " + lap_count)
      console.log("lap race: " + riderRun[0].categories.lap)
      if (parseInt(lap_count) === parseInt(riderRun[0].categories.lap)) {
        await prisma.riders.update({
          where: {
            id: riderRun[0].id,
          },
          data: {
            run: false,
            note: "FINISHER",
            total_waktu: now.toString(),
          },
        });
      } else {
        await prisma.riders.update({
          where: {
            id: riderRun[0].id,
          },
          data: {
            total_waktu: now.toString(),
          },
        });
      }

      throw new Error(JSON.stringify(race_result));
    });
  } catch (error) {
    prisma.$disconnect();
    return error.message;
  }
};

const getRidersByCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await prisma.riders.findMany({
      where: {
        category_id: Number(id),
      },
    });

    res.json({
      message: "GET all riders by categoriees success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const createRiderTest = async () => {
  const now = Date.now().toString();
  const race_result = await prisma.race_results.create({
    data: {
      rider_id: 1,
      category_id: 2,
      finish_time: now,
    },
  });
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
      include: {
        categories: {
          include: {
            events: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
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

  if (!body.name || !body.team_name) {
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
        id_beacon: Number(body.id_beacon),
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

  if (!body.name || !body.team_name) {
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
        id_beacon: Number(body.id_beacon),
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
const updateRiderNote = async (req, res) => {
  const { idRider, note } = req.params;

  try {
    const rider = await prisma.riders.update({
      where: {
        id: Number(idRider),
      },
      data: {
        note,
        run: note !== "RUN" ? false : true,
      },
    });
    res.json({
      message: "UPDATE rider note success",
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
  getRidersByCategory,
  getRider,
  createNewRider,
  createRiderTest,
  createRiderFinish,
  updateRider,
  updateRiderNote,
  deleteRider,
  record,
};
