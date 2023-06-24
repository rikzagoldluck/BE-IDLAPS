require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
// const usersRoutes = require('./routes/users');
const eventsRoutes = require("./routes/events");
const categoriesRoutes = require("./routes/categories");
const ridersRoutes = require("./routes/riders");
const teamsRoutes = require("./routes/teams");
const beaconsRoutes = require("./routes/beacons");
const racesRoutes = require("./routes/races");
const utilitiesRoutes = require("./routes/utilities");

const middlewareLogRequest = require("./middleware/logs");
// const upload = require('./middleware/multer');

const app = express();
app.use(cors());
app.use(middlewareLogRequest);
app.use(express.json());
app.use("/assets", express.static("public/images"));

app.use("/events", eventsRoutes);
app.use("/categories", categoriesRoutes);
app.use("/riders", ridersRoutes);
app.use("/teams", teamsRoutes);
app.use("/races", racesRoutes);
app.use("/beacons", beaconsRoutes);
app.use("/utilities", utilitiesRoutes);
// app.post("/upload", upload.single("photo"), (req, res) => {
//   res.json({
//     message: "Upload berhasil",
//   });
// });

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});

const mqtt = require("mqtt");
const connectOptions = require("./config/mqtt_connection");
const {
  createRiderFinish,
  createRiderTest,
  getRiderRunByBeacon,
  record,
} = require("./controller/riders");
const { Prisma } = require("@prisma/client");

const clientId = "idlaps_nodejs_" + Math.random().toString(16).substring(2, 8);
const options = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  // username: "rikza",
  // password: "@Rikza09",
  reconnectPeriod: 1000,
};

const { PrismaClient } = require("@prisma/client");
// const { getUtility } = require("./utilities");

const prisma = new PrismaClient();

const { protocol, host, port } = connectOptions;

let connectUrl = `${protocol}://${host}:${port}`;
if (["ws", "wss"].includes(protocol)) connectUrl += "/mqtt";

const client = mqtt.connect(connectUrl, options);
const qos = 0;

const getBeacons = async (req, res) => {
  try {
    const response = await prisma.beacon.findMany();
    return response;
  } catch (error) {
    return error;
  }
};

client.on("connect", () => {
  console.log(`${protocol}: Connected`);
  client.subscribe("silabs/aoa/position/multilocator-timing/ble-pd-#", {
    qos,
  });
  getBeacons().then((res) => {
    res.forEach((beacon) => {
      client.subscribe(
        `silabs/aoa/position/multilocator-timing/ble-pd-${beacon.tag_id}`,
        { qos },
        (error) => {
          if (error) {
            console.log("subscribe error:", error);
            return;
          }
          console.log(
            `${protocol}: Subscribe to topic 'silabs/aoa/position/multilocator-timing/ble-pd-${beacon.tag_id}'`
          );
        }
      );
    });
  });
});

client.on("reconnect", (error) => {
  console.log(`Reconnecting(${protocol}):`, error);
});

client.on("error", (error) => {
  console.log(`Cannot connect(${protocol}):`, error);
});

let lastData = {};
let isFirstData = true;

const p = async () => {
  try {
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
    console.log(interval.value);
    return interval.value;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

client.on("message", (topic, payload) => {
  try {
    const { mac, y, time } = JSON.parse(payload.toString());

    // RECORD ONLY IF Y AND TIME IS DIFFERENT
    if (
      (lastData.mac !== mac || lastData.y !== y || lastData.time !== time) &&
      isFirstData
    ) {
      lastData = { mac, y, time };
      // record(mac);
      isFirstData = false;
      console.log("mac : " + mac + ", y : " + y + "");
    }
  } catch (error) {
    console.log("Error:", error);
  }
});

if (!isFirstData) {
  console.log(p() * 1000 * 60);
  setTimeout(() => {
    isFirstData = true;
    console.log("a");
  }, p() * 1000 * 60);
}
// record("4C5BB3110C3B")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));
