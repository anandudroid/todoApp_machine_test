import { DTO } from "./dto";
import { ITask } from '../models/interfaces/itask';

export class TaskDTO extends DTO<ITask> implements ITask {

    id: string;
    taskId: string;
    tree: string[];
    parentId: string;
    name: string;
    completionDate: string | Date;
    taskStatus: string;

    constructor(model?: ITask) {
        super(model);

        this.id = model.id;
        if (this.id === undefined) {
            this.id = model["_id"];
        }

        this.taskId = model.taskId;
        this.name = model.name;
        this.tree = model.tree;
        this.parentId = model.parentId;
        this.completionDate = model.completionDate;
        this.taskStatus = model.taskStatus;
    }
}

