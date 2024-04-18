import { Router, Request, Response } from "express";
import { Task, taskRepository } from "./task.repository";

export const taskRouter = Router();

taskRouter.post("/search", async (req: Request, resp: Response) => {
	const criteria = req.body as TaskSearchRequestCriteria;

	const tasks = await taskRepository.search(criteria);
	const count = await taskRepository.count();

	const response: TaskSearchResponse = {
		data: tasks,
		page: {
			pageSize: criteria.pageSize,
			totalElements: count,
			pageNumber: criteria.pageNumber,
		},
	};

	resp.status(200).send(response);
});

taskRouter.post("/", async (req: Request, resp: Response) => {
	resp.send(await taskRepository.create(req.body as Task));
});

taskRouter.put("/", async (req: Request, resp: Response) => {
	resp.send(await taskRepository.update(req.body as Task));
});

export interface TaskSearchRequestCriteria {
	pageSize: number;
	pageNumber: number;
}

export interface TaskSearchResponse {
	data: Task[];
	page: TaskSearchResponsePageInfo;
}

export interface TaskSearchResponsePageInfo {
	pageSize: number;
	pageNumber: number;
	totalElements: number;
}
