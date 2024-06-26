import * as Prisma from "@prisma/client";
import { TaskSearchRequestCriteria } from "./task.router";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./task.interface";

export class TaskRepository {
	prisma = new Prisma.PrismaClient();

	public search = async (criteria: TaskSearchRequestCriteria): Promise<Task[]> => {
		return await this.prisma.task.findMany({
			skip: criteria.pageSize * criteria.pageNumber,
			take: criteria.pageSize,
		});
	};

	public count = async (): Promise<number> => {
		return this.prisma.task.count();
	};

	public create = async (entity: Task): Promise<Task> => {
		return await this.prisma.task.create({
			data: {
				id: uuidv4(),
				name: entity.name,
				description: entity.description,
				dueDate: entity.dueDate,
				createdDate: BigInt(Date.now()),
			},
		});
	};

	public update = async (entity: Task): Promise<Task> => {
		return await this.prisma.task.update({
			where: { id: entity.id },
			data: {
				name: entity.name,
				description: entity.description,
				dueDate: entity.dueDate,
			},
		});
	};
}

export const taskRepository = new TaskRepository();
