import { TaskMapper } from "../../mapper/task.mapper";
import { ITask } from "../../models/interfaces/itask";
import { InternalServerErrorException } from "../../response/exceptions/defaults/23.internal_server_error.exception";
import { IResponse } from "../../response/responss";

export class TaskRequestModelBuilder {

    task: ITask;
    parentTask: ITask;

    constructor(task: ITask, parent: ITask) {

        this.task = task;
        this.parentTask = parent
    }

    public build(): Promise<ITask> {

        return new Promise((resolve, reject) => {

            try {

                let task = TaskMapper.mapTask(this.task, this.parentTask)
                resolve(task);
            } catch (error) {
                reject(IResponse.Exception(new InternalServerErrorException().append(error)));
            }
        });
    }
}