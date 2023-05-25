require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
// const usersRoutes = require('./routes/users');
const eventsRoutes = require("./routes/events");
const categoriesRoutes = require("./routes/categories");
const ridersRoutes = require("./routes/riders");
const teamsRoutes = require("./routes/teams");

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
