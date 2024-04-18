import request from "supertest";
import { taskRouter } from "./task.router";
import { Task } from "./task.interface";
import { jest, describe, expect, it, beforeEach } from "@jest/globals";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import helmet from "helmet";
import cors from "cors";

// Mocking taskRepository methods for testing
jest.mock("./task.repository", () => ({
	taskRepository: {
		search: jest.fn(),
		count: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
	},
}));

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/task", taskRouter);

// Now, explicitly type the mocked object
import { taskRepository } from "./task.repository"; // Import the mocked object
const mockedTaskRepository = taskRepository as jest.Mocked<typeof taskRepository>;
import "./polyfills";

describe("Task Router", () => {
	beforeEach(() => {
		jest.clearAllMocks(); // Clear mocks before each test
	});

	it("should respond with search results for POST /search", async () => {
		const criteria = { pageSize: 10, pageNumber: 1 };
		const mockResultFromRepository: Task[] = [
			{
				id: uuidv4(),
				name: "Task 1",
				description: "test 123",
				dueDate: 265235n,
				createdDate: 43243n,
			},
			{
				id: uuidv4(),
				name: "Task 2",
				description: "test 456",
				dueDate: 432932943249n,
				createdDate: 234324423n,
			},
		];
		const mockCount = 20;
		const expectedResult = {
			data: mockResultFromRepository.map((taskFromRepository) => {
				return {
					...taskFromRepository,
					dueDate: taskFromRepository.dueDate.toString(),
					createdDate: taskFromRepository.createdDate.toString(),
				};
			}),
			page: {
				pageSize: criteria.pageSize,
				pageNumber: criteria.pageNumber,
				totalElements: mockCount,
			},
		};

		mockedTaskRepository.search.mockResolvedValue(mockResultFromRepository);
		mockedTaskRepository.count.mockResolvedValue(mockCount);

		const response = await request(app).post("/api/task/search").send(criteria);

		expect(response.status).toBe(200);
		expect(response.body).toEqual(expectedResult);
	});

	it("should respond with created task for POST /", async () => {
		const mockTask: Task = {
			id: uuidv4(),
			name: "Task 1",
			description: "helloooo",
			dueDate: 23423234n,
			createdDate: 87674n,
		};

		jest.spyOn(taskRepository, "create").mockResolvedValue(mockTask);

		const response = await request(app).post("/api/task/").send(mockTask);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			...mockTask,
			dueDate: mockTask.dueDate.toString(),
			createdDate: mockTask.createdDate.toString(),
		});
	});

	it("should respond with updated task for PUT /", async () => {
		const mockTask: Task = {
			id: uuidv4(),
			name: "Task 1",
			description: "hell235325oooo",
			dueDate: 23423234n,
			createdDate: 87674n,
		};

		jest.spyOn(taskRepository, "update").mockResolvedValue(mockTask);

		const response = await request(app).put("/api/task").send(mockTask);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			...mockTask,
			dueDate: mockTask.dueDate.toString(),
			createdDate: mockTask.createdDate.toString(),
		});
	});

	it("should respond with 500 error for internal server error", async () => {
		jest.spyOn(taskRepository, "search").mockRejectedValue(new Error("Internal server error"));

		const response = await request(app)
			.post("/api/task/search")
			.send({ pageSize: 10, pageNumber: 1 });

		expect(response.status).toBe(500);
		expect(response.body).toEqual({ error: "Internal server error" });
	});
});
