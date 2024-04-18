import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { metricsRouter } from "./metrics.router";
import { taskRouter } from "./task.router";
import "./polyfills";

dotenv.config();

if (!process.env.PORT) {
	process.exit(1);
}

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/metrics", metricsRouter);
app.use("/api/task", taskRouter);

app.listen(process.env.PORT, () => {
	console.log(`Listening on port ${process.env.PORT}`);
});
