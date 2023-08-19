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
//   res.json({
//     message: "Upload berhasil",
//   });
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

const clientId = "idlaps_nodejs_" + Math.random().toString(16).substring(2, 8);
const options = {
  clientId,
  clean: true,
  connectTimeout: 4000, // username: "rikza", // password: "@Rikza09",
  reconnectPeriod: 1000,
};

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { protocol, host, port } = connectOptions;

let connectUrl = `${protocol}://${host}:${port}`;
if (["ws", "wss"].includes(protocol)) connectUrl += "/mqtt";

const client = mqtt.connect(connectUrl, options);
const qos = 0;

const getBeacons = async () => {
  try {
    const response = await prisma.beacon.findMany();
    return response;
  } catch (error) {
    return error;
  }
};

client.on("connect", () => {
  console.log(`${protocol}: Connected`);
  //client.subscribe("silabs/aoa/angle/ble-pd-4C5BB3112B88/ble-pd-#", {
    client.subscribe("silabs/aoa/position/multilocator-test_room/ble-pd-#", {
    qos,
  });
  getBeacons().then((res) => {
    res.forEach((beacon) => {
      client.subscribe(
        //`silabs/aoa/angle/ble-pd-4C5BB3112B88/ble-pd-${beacon.tag_id}`, 
        `silabs/aoa/position/multilocator-test_room/ble-pd-${beacon.tag_id}`,
        { qos },
        (error) => {
          if (error) {
            console.log("subscribe error:", error);
            return;
          } // untuk ANGLE
          console.log(
            //`${protocol}: Subscribe to topic 'silabs/aoa/angle/ble-pd-4C5BB3112B88/ble-pd-${beacon.tag_id}'` 
            `${protocol}: Subscribe to topic 'silabs/aoa/position/multilocator-test_room/ble-pd-${beacon.tag_id}'`
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

const setIsFirstData = () => {
  setTimeout(() => {
    isFirstData = true;
  }, 100);
};
client.on("message", (topic, payload) => {
  try {
    //const {mac = topic.toString().slice(-12), elevation, azimuth,  time = Date.now().toString(), } = JSON.parse(payload.toString()); 
    const { mac, y, x, time } = JSON.parse(payload.toString()); 
    //console.log(Date.now().toString())
    //mac == '4C5BB3110F71' && console.log(mac, "  ", x, "  ", time);
     console.log(mac, "  ", x, "  ", time); // RECORD ONLY IF Y AND TIME IS DIFFERENT // console.dir(JSON.parse(payload.toString()), {depth: "Infinity"})
    //if (parseFloat(elevation) < 75.0 || parseFloat(elevation) > 90.0) return; 
    if (parseFloat(x) < -1.0 || parseFloat(x) > 2.0) return;
    if (
      (lastData.mac !== mac ||
        lastData.x !== x ||
        lastData.time !== time) &&
      isFirstData
    ) {
      lastData = { mac, x, time }; //lastData = { mac, y, x, time };
      record(mac);
      // console.log(
      //   "pastikan kode ini hanya jalan 1 kali ketika record, jika tidak silakan naikan delay setTimout di atas"
      // );
      isFirstData = false;
      setIsFirstData();
    } else {
      // console.log("data sama");
    }
  } catch (error) {
    console.log("Error:", error);
  }
});

// record("4C5BB3110C3B")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));

process.on("exit", () => {
  client.end();
  prisma.$disconnect();
});

