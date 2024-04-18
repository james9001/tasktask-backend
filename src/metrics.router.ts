import express from "express";
import promclient from "prom-client";

export const metricsRouter = express.Router();

const register = new promclient.Registry();
register.setDefaultLabels({
	app: "tasktask-backend",
});
promclient.collectDefaultMetrics({ register });

metricsRouter.get("/prometheus", async function (req, res) {
	try {
		res.set("Content-Type", register.contentType);
		res.send(await register.metrics());
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal server error" });
	}
});
