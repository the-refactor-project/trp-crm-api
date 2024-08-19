import express from "express";
import morgan from "morgan";
import cors from "cors";
import healthCheckController from "./healthCheck/healthCheckController.js";
import {
  generalError,
  notFoundError,
} from "./errors/middlewares/errorMiddlewares.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/", healthCheckController);

app.use(notFoundError);
app.use(generalError);

export default app;
