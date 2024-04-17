import { Router, Request, Response } from "express";

export const testRouter = Router();

testRouter.get("/hello", async (req: Request, resp: Response) => {
	console.log("Hello");
	resp.status(200).send("test successful");
});
