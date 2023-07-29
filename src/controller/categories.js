const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
  try {
    const response = await prisma.categories.findMany({
      include: {
        events: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json({
      message: "GET all categories success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const getCategoriesByEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.categories.findMany({
      where: {
        event_id: Number(id),
      },
    });
    return data;

    res.json({
      message: "GET categories success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
    // console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

const getCategoriesAndRidersByEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await prisma.events.findUnique({
      where: { id: Number(id) },
      include: {
        categories: {
          include: {
            riders: true,
          },
        },
      },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    // Calculate the number of riders in each category
    const categoriesWithRiderCount = event.categories.map((category) => ({
      ...category,
      riderCount: category.riders.length,
    }));
    res.json({
      message: "GET categories success",
      data: categoriesWithRiderCount,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
    // console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
};

const getCategoriesRace = async (req, res) => {
  try {
    const response = await prisma.categories.findMany({
      where: {
        start_sch: {
          lte: new Date().getTime().toString(),
          gte: new Date(new Date().setDate(new Date().getDate() - 1))
            .getTime()
            .toString(),
        },
      },
      include: {
        events: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            riders: true,
          },
        },
      },
    });

    res.json({
      message: "GET all categories success",
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

const getCategory = async (req, res) => {
  const { idCategory } = req.params;
  try {
    const data = await prisma.categories.findUnique({
      include: {
        events: {
          select: {
            name: true,
          },
        },
      },
      where: {
        id: Number(idCategory),
      },
    });

    res.json({
      message: "GET category success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
  }
};

const createNewCategory = async (req, res) => {
  const { body } = req;

  if (!body.name || !body.sex) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    const response = await prisma.categories.create({
      data: {
        ...body,
        distance: Number(body.distance),
        lap: Number(body.lap),
        event_id: Number(body.event_id),
      },
    });

    res.status(201).json({
      message: "CREATE new category success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const updateCategoriesByEventId = async (req, res) => {
  const { forWhat } = req.params;

  let data = {},
    dataForRider = {};
  if (forWhat === "start") {
    data = {
      start_time: Date.now().toString(),
      run: true,
    };
    dataForRider = {
      run: "RUN",
    };
  } else if (forWhat === "stop") {
    data = {
      end_time: Date.now().toString(),
      run: false,
    };
  } else if (forWhat === "clear") {
    data = {
      start_time: "0",
      end_time: "0",
      run: false,
    };
    dataForRider = {
      run: "STOP",
      total_waktu: "0",
    };
  }
  try {
    await prisma.$transaction(async (tx) => {
      const categoriesUpdated = await prisma.categories.updateMany({
        where: {
          event_id: Number(req.body.event_id),
          id: {
            in: req.body.categories,
          },
        },
        data,
      });

      await prisma.riders.updateMany({
        where: {
          category_id: {
            in: req.body.categories,
          },
        },
        data: dataForRider,
      });

      if (forWhat === "stop") {
        await prisma.riders.updateMany({
          where: {
            category_id: {
              in: req.body.categories,
            },
            run: "RUN",
          },
          data: {
            run: "DNF",
          },
        });
      } else {
        await prisma.riders.updateMany({
          where: {
            category_id: {
              in: req.body.categories,
            },
          },
          data: dataForRider,
        });
      }

      if (forWhat === "clear") {
        await prisma.race_results.deleteMany({
          where: {
            category_id: {
              in: req.body.categories,
            },
          },
        });
      }

      res.json({
        message: "UPDATE category success",
        data: categoriesUpdated,
      });
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const updateCategory = async (req, res) => {
  const { idCategory } = req.params;
  const { body } = req;

  if (!body.name || !body.sex) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah",
      data: null,
    });
  }

  try {
    const category = await prisma.categories.update({
      where: {
        id: Number(idCategory),
      },
      data: {
        ...body,
        distance: Number(body.distance),
        lap: Number(body.lap),
        event_id: Number(body.event_id),
      },
    });
    res.json({
      message: "UPDATE category success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const updateRaceToday = async (req, res) => {
  const { id, status } = req.params;
  try {
    const category = await prisma.categories.update({
      where: {
        id: Number(id),
      },
      data: {
        race_today: status === "true" ? true : false,
      },
    });
    res.json({
      message: "UPDATE category success",
      data: category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const updateRun = async (req, res) => {
  const { id, status } = req.params;

  try {
    const category = await prisma.categories.update({
      where: {
        id: Number(id),
      },
      data: {
        run: status === "true" ? true : false,
      },
    });
    res.json({
      message: "UPDATE category success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
const updateStartTime = async (req, res) => {
  const { id } = req.params;
  // unix timestamp now
  const now = Date.now().toString();
  try {
    const category = await prisma.categories.updateMany({
      where: {
        id: {
          equals: Number(id),
        },
        start_time: {
          equals: "0",
        },
      },
      data: {
        start_time: now,
      },
    });
    res.json({
      message: "UPDATE category success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};
const updateEndTime = async (req, res) => {
  const { id } = req.params;
  // unix timestamp now
  const now = Date.now().toString();
  try {
    const category = await prisma.categories.updateMany({
      where: {
        id: {
          equals: Number(id),
        },
        end_time: {
          equals: "0",
        },
      },
      data: {
        end_time: now,
      },
    });
    res.json({
      message: "UPDATE category success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  const { idCategory } = req.params;
  try {
    const category = await prisma.categories.delete({
      where: {
        id: Number(idCategory),
      },
    });
    res.json({
      message: "DELETE category success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoriesRace,
  getCategoriesByEvent,
  getCategoriesAndRidersByEvent,
  getCategory,
  createNewCategory,
  updateCategory,
  updateRaceToday,
  updateRun,
  updateStartTime,
  updateEndTime,
  updateCategoriesByEventId,
  deleteCategory,
};
