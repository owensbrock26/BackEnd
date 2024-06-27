const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/workouts", {
    useNewUrlParser: false,
    useUnifiedTopology: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/workouts", require("./routes/workouts"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
