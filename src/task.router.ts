import { Router, Request, Response } from "express";
import { taskRepository } from "./task.repository";
import { Task } from "./task.interface";

export const taskRouter = Router();

taskRouter.post("/search", async (req: Request, resp: Response) => {
	try {
		const criteria = req.body as TaskSearchRequestCriteria;
		resp.send({
			data: await taskRepository.search(criteria),
			page: {
				pageSize: criteria.pageSize,
				totalElements: await taskRepository.count(),
				pageNumber: criteria.pageNumber,
			},
		} as TaskSearchResponse);
	} catch (error) {
		console.log(error);
		resp.status(500).json({ error: "Internal server error" });
	}
});

taskRouter.post("/", async (req: Request, resp: Response) => {
	try {
		resp.send(await taskRepository.create(req.body as Task));
	} catch (error) {
		console.log(error);
		resp.status(500).json({ error: "Internal server error" });
	}
});

taskRouter.put("/", async (req: Request, resp: Response) => {
	try {
		resp.send(await taskRepository.update(req.body as Task));
	} catch (error) {
		console.log(error);
		resp.status(500).json({ error: "Internal server error" });
	}
});

export interface TaskSearchRequestCriteria {
	pageSize: number;
	pageNumber: number;
}

export interface TaskSearchResponse {
	data: Task[];
	page: TaskSearchResponsePageInfo;
}

interface TaskSearchResponsePageInfo {
	pageSize: number;
	pageNumber: number;
	totalElements: number;
}
