import { Mapper } from "./mapper";
import { ITask } from "../models/interfaces/itask";
import { TaskDTO } from '../responseDTOs/task.dto';
import { IResponse } from "../response/responss";
import { PreConditionFailedException } from "../response/exceptions/defaults/13.precondition_failed.exception";
import { ErrorMessages } from "../response/codes/error_messages";
import * as  uuid from 'uuid/v4';
import { ILogger } from "../ilogger";
import { StringValidation } from "../validations/string.validation";

export class TaskMapper extends Mapper {

    constructor() {
        super()
    }

    static map(savedModel: (ITask & import("mongoose").Document)[]): TaskDTO[] {

        let taskDtos: TaskDTO[] = [];

        savedModel.forEach((task: ITask) => {
            taskDtos.push(new TaskDTO(task))
        });

        return taskDtos;
    }


    static masterValueCompare(result: ITask[], task: ITask): Promise<ITask[]> {

        return new Promise((resolve, reject) => {

            return result.map(item => {
                if (item.taskId == task.taskId) {
                    if (item.name === task.name) {
                        reject(IResponse.Exception(new PreConditionFailedException(ErrorMessages.VALUE_ALREADY_EXISTS).append("task name: " + item.name)));
                        return;

                    }
                    resolve(result);
                    return;

                }
                else {

                    reject(IResponse.Exception(new PreConditionFailedException(ErrorMessages.VALUE_ALREADY_EXISTS).append("task name: " + item.name)));

                }
            })
        })
    }


    static mapTask(taskNode: ITask, parent: ITask) {

        let parentTree: any[] = [];

        if (taskNode == undefined || taskNode == null) {

            ILogger.log("mapTask", "taskNode == undefined");
            throw "mapTask taskNode == undefined"
        }

        if (StringValidation.validate(taskNode.taskId) == false) {
            taskNode.taskId = uuid();
        }

        try {

            let taskModel: TaskDTO = new TaskDTO(taskNode as unknown as ITask)

            if (parent != null && parent != undefined) {

                if (parent.tree != undefined && parent.tree != null) {
                    parentTree = parent.tree;
                }

                if (StringValidation.validate(parent.taskId)) {
                    parentTree.push(parent.taskId);
                }
            }

            taskNode.tree = parentTree
            taskModel.tree = parentTree
            return taskModel

        } catch (error) {
            throw error;
        }
    }
}