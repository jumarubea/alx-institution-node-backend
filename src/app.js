const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv").config();

const sequelize = require("./config/database");
require("./models/index");
const routes = require("./routes/index");
const helperMsg = require("./utils/helperMsg");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use("/api", routes);
app.use(helperMsg.notFound);
app.use(helperMsg.server500);

// Sync database and start server
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced successfully");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
    process.exit(1);
  });

module.exports = app;
