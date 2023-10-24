const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const servicesRouter = require("./routes/api/services");
const userRouter = require("./routes/api/user");
const adminRouter = require("./routes/api/admin");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/services", servicesRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.use((__, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, __, res, ___) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
