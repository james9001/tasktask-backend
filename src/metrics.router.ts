import express from "express";
import promclient from "prom-client";

export const metricsRouter = express.Router();

const register = new promclient.Registry();
register.setDefaultLabels({
	app: "tasktask-backend",
});
promclient.collectDefaultMetrics({ register });

metricsRouter.get("/prometheus", async function (req, res) {
	res.set("Content-Type", register.contentType);
	const metrics = await register.metrics();
	res.send(metrics);
});
