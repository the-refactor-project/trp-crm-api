import express from "express";
import morgan from "morgan";
import cors from "cors";
import healthCheckController from "./healthCheck/healthCheckController.js";
import {
  generalError,
  notFoundError,
} from "./errors/middlewares/errorMiddlewares.js";
import movementsRouter from "../entities/movement/router/movementsRouter.js";
import movementsCategoriesRouter from "../entities/movementCategory/router/movementCategoriesRouter.js";
import providersRouter from "../entities/provider/router/providersRouter.js";
import leadsRouter from "../entities/lead/router/leadsRouter.js";
import coursesRouter from "../entities/course/router/coursesRouter.js";
import courseEditionsRouter from "../entities/courseEdition/router/courseEditionsRouter.js";
import expensesRouter from "../entities/expense/router/expensesRouter.js";
import leadEventsRouter from "../entities/leadEvent/router/leadEventsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", healthCheckController);

app.use("/movements", movementsRouter);
app.use("/movement-categories", movementsCategoriesRouter);
app.use("/expenses", expensesRouter);
app.use("/providers", providersRouter);
app.use("/leads", leadsRouter);
app.use("/lead-events", leadEventsRouter);
app.use("/courses", coursesRouter);
app.use("/course-editions", courseEditionsRouter);

app.use(notFoundError);
app.use(generalError);

export default app;
