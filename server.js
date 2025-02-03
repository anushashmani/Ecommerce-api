const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { config } = require("./src/configs/server.config");
const { route: userRoute } = require("./src/routes/user.routes");
const { route: prodRoute } = require("./src/routes/product.routes");
const { route: cartRoute } = require("./src/routes/cart.routes");
const { route: checkoutRoute } = require("./src/routes/checkout.routes");

require("dotenv").config();

async function connectToDB() {
  try {
    console.log("Establishing DB connection....");
    await mongoose.connect(config.dbUri);
    console.log("DB connected");
  } catch (error) {
    console.log("error", error);
  }
}

connectToDB();

const PORT = config.appPort;
const app = express();
const corsConfig = {
  origin: true,
  credentials: true,
};
(async () => {
  try {
    await connectToDB();

    app.use(cors(corsConfig));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.use("/api", userRoute);
    app.use("/api", prodRoute);
    app.use("/api", cartRoute);
    app.use("/api", checkoutRoute);

    app.get("*", (req, res) => {
      return res.send("This is the backend server");
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error", error);
  }
})();
