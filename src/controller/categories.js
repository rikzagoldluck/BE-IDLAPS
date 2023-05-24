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
        start_time: Number(body.start_time),
        end_time: Number(body.end_time),
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
        start_time: Number(body.start_time),
        end_time: Number(body.end_time),
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
  getCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
