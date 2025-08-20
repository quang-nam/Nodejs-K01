import express from "express";
import connectDB from "./src/common/configs/connectDB.js";
import router from "./src/routes/index.js";
import { errorHandler } from "./src/common/middlewares/errorHandler.js";
import { HOST, PORT } from "./src/common/configs/.environment.js";
import setupSwagger from "./src/common/configs/swagger-config.js";

const app = express();
// connect mongodb
connectDB();
// xu ly json body tu client
app.use(express.json());

// middleware xu ly loi => phai dat cuoi cung
app.use("/api", router);

setupSwagger(app);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Example app listening at http://${HOST} on port ${PORT}`);
  console.log(`Swagger Docs available at http://${HOST}:${PORT}/api-docs`);
});
