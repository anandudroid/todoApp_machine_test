import { ITask } from '../models/interfaces/itask';
import { ITaskIONode, ITaskNode } from '../models/interfaces/itask.node';
import { ArrayValidation } from '../validations/array.validations';
import { ILogger } from '../ilogger';
import { TaskDTO } from '../responseDTOs/task.dto';
import { StringValidation } from '../validations/string.validation';
import * as  uuid from 'uuid/v4';

export class TaskNodeTotaskModelMapper {

    private taskModels = new Array<ITask>();

    constructor(public nodes: ITaskNode[]) {

        if (ArrayValidation.validate(nodes) == false) {

            ILogger.log("TaskNodeTotaskModelMapper.map", "taskNode[] == undefined");
            throw "TaskNodeTotaskModelMapper.map taskNode == undefined"
        }

        for (let i = 0; i < nodes.length; i++) {

            try {
                nodes["isDeleted"] = false;
                this.map(nodes[i]);
            } catch (error) {
                throw error;
            }
        }

    }

    public build(): Array<ITask> {
        return this.taskModels;
    }

    private map(taskNode: ITaskNode, parentTree: any[] = [], nameTree: any[] = []) {

        if (taskNode == undefined || taskNode == null) {

            throw "TaskNodeTotaskModelMapper.map taskNode == undefined"
        }

        if (StringValidation.validate(taskNode.taskId) == false) {
            taskNode.taskId = uuid();
        }

        try {

            let taskModel: TaskDTO = new TaskDTO(taskNode as unknown as ITask)

            if (StringValidation.validate(taskNode.parentId)) {
                parentTree.push(taskNode.parentId);
            }


            taskNode["tree"] = parentTree
            taskModel.tree = parentTree


            taskModel["isDeleted"] = false;

            this.taskModels.push(taskModel);

            if (ArrayValidation.validate(taskNode["subTask"])) {

                for (let i = 0; i < taskNode["subTask"].length; i++) {

                    ILogger.log("getMapedData.validate.tree", taskNode["tree"]);
                    taskNode["subTask"][i].parentId = taskNode.taskId;
                    this.map(taskNode["subTask"][i], Array.from(parentTree), Array.from(nameTree));
                }
            }
        } catch (error) {
            throw error;
        }
    }

}
