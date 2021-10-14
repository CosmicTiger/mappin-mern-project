const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/Pins.routes");
const userRoute = require("./routes/User.routes");

const app = express();

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => console.err('There is a problem with MongoDB', err));

app.use("/api/pins/", pinRoute);
app.use("/api/users/", userRoute);

app.listen(8800, () => {
    console.log("Server started on port 8800, backend online");
});
