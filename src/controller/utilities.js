const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUtility = async (req, res) => {
  try {
    const response = await prisma.utilities.findFirst({
      where: {
        name: {
          equals: req.params.key,
        },
      },
    });

    res.json({
      message: "GET utility success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

const updateUtility = async (req, res) => {
  try {
    const response = await prisma.utilities.updateMany({
      where: {
        name: {
          equals: req.params.key,
        },
      },
      data: {
        value: req.body.value,
      },
    });
    res.json({
      message: "Update utility success",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message,
    });
  }
};

module.exports = {
  getUtility,
  updateUtility,
};
