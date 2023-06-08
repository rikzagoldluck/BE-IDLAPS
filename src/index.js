require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
// const usersRoutes = require('./routes/users');
const eventsRoutes = require("./routes/events");
const categoriesRoutes = require("./routes/categories");
const ridersRoutes = require("./routes/riders");
const teamsRoutes = require("./routes/teams");
const racesRoutes = require("./routes/races");

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
const { createRiderFinish } = require("./controller/riders");

const clientId = "idlaps_nodejs_" + Math.random().toString(16).substring(2, 8);
const options = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  // username: "rikza",
  // password: "@Rikza09",
  reconnectPeriod: 1000,
};

const { protocol, host, port } = connectOptions;

let connectUrl = `${protocol}://${host}:${port}`;
if (["ws", "wss"].includes(protocol)) connectUrl += "/mqtt";

const client = mqtt.connect(connectUrl, options);

const topic = "nodejs/mqtt";
const payload = "nodejs mqtt test";
const qos = 0;

client.on("connect", () => {
  console.log(`${protocol}: Connected`);

  client.subscribe(topic, { qos }, (error) => {
    if (error) {
      console.log("subscribe error:", error);
      return;
    }
    console.log(`${protocol}: Subscribe to topic '${topic}'`);
  });
});

client.on("reconnect", (error) => {
  console.log(`Reconnecting(${protocol}):`, error);
});

client.on("error", (error) => {
  console.log(`Cannot connect(${protocol}):`, error);
});

client.on("message", (topic, payload) => {
  // console.log("Received Message:", topic, payload.toString());
  try {
    const idbeacon = payload.toString();
    const now = Date.now();
    createRiderFinish(idbeacon, now);
  } catch (error) {
    console.log("Error:", error);
  }
});
