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

    res.json({
      message: "GET categories success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ status: "Server Error", message: error.message });
  }
};

const getCategoriesRace = async (req, res) => {
  try {
    const response = await prisma.categories.findMany({
      where: {
        race_today: true,
      },
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

  if (!body.name || !body.description || !body.sex) {
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

const updateCategory = async (req, res) => {
  const { idCategory } = req.params;
  const { body } = req;

  if (!body.name || !body.description || !body.sex) {
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
  getCategory,
  createNewCategory,
  updateCategory,
  updateRaceToday,
  updateRun,
  updateStartTime,
  updateEndTime,
  deleteCategory,
};
