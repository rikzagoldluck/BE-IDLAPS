const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getBeacons = async (req, res) => {
  try {
    const response = await prisma.beacon.findMany();
    res.json({
      message: "GET all beacons success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const getAvailableBeacons = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.$transaction(async (tx) => {
      // GET ALL ID CATEGORY FROM EVENT ID
      // const idCategory = await prisma.categories.findMany({
      //   where: {
      //     event_id: Number(id),
      //   },
      //   select: {
      //     id: true,
      //   },
      // });

      // GET ALL ID BEACON FROM ID CATEGORY
      // const beaconUsed = await prisma.riders.findMany({
      //   where: {
      //     category_id: {
      //       in: idCategory.map((category) => category.id),
      //     },
      //   },
      //   select: {
      //     id_beacon: true,
      //   },
      // });

      const beaconUsed = await prisma.riders.findMany({
        where: {
          categories: {
            event_id: Number(id),
          },
        },
        select: {
          id_beacon: true,
        },
      });
      // if (beaconUsed.length === 0) {
      //   // throw new Error("ID Event : " + id + " not found");
      //   res.json({
      //     message: "",
      //     message: "ID Event : " + id + " not found",
      //   });
      // } else {

      // GET ALL BEACON AVAILABLE
      const response = await prisma.beacon.findMany({
        where: {
          id: {
            notIn: beaconUsed.map((beacon) => beacon.id_beacon),
          },
        },
      });

      res.json({
        message: "GET all beacons success",
        data: response,
      });
    });
    // });
  } catch (error) {
    prisma.$disconnect();
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
const getAvailableBeaconsAndChoosen = async (req, res) => {
  try {
    const { id, beaconRider } = req.params;
    await prisma.$transaction(async (tx) => {
      const beaconUsed = await prisma.riders.findMany({
        where: {
          categories: {
            events: {
              id: Number(id),
            },
          },
        },
        select: {
          id_beacon: true,
        },
      });
      if (beaconUsed.length === 0) {
        // throw new Error("ID Event : " + id + " not found");
        res.status(404).json({
          status: "Not Found",
          message: "ID Event : " + id + " not found",
        });
      } else {
        const response = await prisma.beacon.findMany({
          where: {
            id: {
              notIn: beaconUsed
                .map((beacon) => beacon.id_beacon)
                .filter((id) => id != beaconRider),
            },
          },
        });

        res.json({
          message: "GET all beacons success",
          data: response,
        });
      }
    });
  } catch (error) {
    prisma.$disconnect();
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

module.exports = {
  getBeacons,
  getAvailableBeacons,
  getAvailableBeaconsAndChoosen,
};
