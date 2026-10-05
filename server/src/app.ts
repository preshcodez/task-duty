import express, { Application } from "express";
import cors from "cors";
import passport from "./config/passport";

import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

import { errorHandler } from "./middleware/errorMiddleware";

const app: Application = express();

app.use(express.json());

app.use(cors());

app.use(passport.initialize());

app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;
