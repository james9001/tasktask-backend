import { TaskSearchRequestCriteria } from "./task.router";

export class TaskRepository {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public search = async (criteria: TaskSearchRequestCriteria): Promise<Task[]> => {
		//TODO: Implement
		const dummyData = [];
		for (let i = 0; i < 10; i++) {
			dummyData.push({
				id: `uuid${i}`,
				name: `name ${i}`,
				description: `description ${i}`,
			});
		}
		return dummyData;
	};

	public count = async (): Promise<number> => {
		//TODO: Implement
		return 10;
	};
}

export const taskRepository = new TaskRepository();

//TODO: implement
export interface Task {
	id: string; //TODO: UUID
	name: string;
	description: string;
}
