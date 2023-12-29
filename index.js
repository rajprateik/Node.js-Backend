const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
const { mogoUrl } = require("./keys");
console.log("url -----", mogoUrl);

require("./models/user");
require("./models/form");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
app.use(bodyParser.json());
app.use(authRoutes);
app.use("/user", userRoutes);

mongoose.connect(mogoUrl, {
  useNewUrlParser: true,
});

mongoose.connection.once("connected", () => {
  console.log("Successfully connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Error", err);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
