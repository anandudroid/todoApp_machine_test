import { ITask } from '../../models/interfaces/itask';
import { IResponse } from '../../response/responss';
import { InternalServerErrorException } from '../../response/exceptions/defaults/23.internal_server_error.exception';
import { NotFoundException } from '../../response/exceptions/defaults/5.notfound.exception';
import { ArrayValidation } from '../../validations/array.validations';
import { ILogger } from '../../ilogger';

export class TaskToJsonBuilder {

    tasks: ITask[];

    constructor(tasks: ITask[]) {
        this.tasks = tasks;
    }

    public build(): Promise<any> {

        return new Promise((resolve, reject) => {

            if (ArrayValidation.validate(this.tasks) == false) {
                reject(IResponse.Exception(new NotFoundException().append("TaskToJsonBuilder.build - taskModels == undefined")))
                return;
            }

            try {

                let taskJson = { task: [] }

                let roottasks: any[] = this.tasks.filter(function (model) {
                    return model.parentId == undefined || model.parentId == null || model.parentId == "";
                });

                if (ArrayValidation.validate(roottasks) == false) {
                    reject(IResponse.Exception(new NotFoundException().append("TaskToJsonBuilder.build - rootasks== undefined")))
                    return;
                }

                for (var i = 0; i < roottasks.length; i++) {

                    try {

                        let newRootTask = this.recursiveCreateSubtask(roottasks[i].toObject(), false)
                        taskJson.task.push(newRootTask);
                    } catch (error) {
                        reject(IResponse.Exception(new InternalServerErrorException().append(error)));
                        return;
                    }
                }

                if (ArrayValidation.validate(taskJson.task) == false) {
                    reject(IResponse.Exception(new NotFoundException().append("TaskToJsonBuilder.buildr - taskJson.task == undefined")));
                    return;
                }

                resolve(taskJson);
            } catch (error) {
                reject(IResponse.Exception(new InternalServerErrorException().append(error)))
            }
        })
    }

    private findAndAppendSubTask(taask) {

        try {

            if (taask == undefined || taask == null || taask.taskId == undefined || taask.taskId == null) {
                return null;
            }

            let subTasks = this.tasks.filter(function (model) {
                return model.parentId == taask.taskId;
            });

            if (ArrayValidation.validate(subTasks)) {

                taask["subTask"] = subTasks;
            }

            return taask;
        } catch (error) {

            throw error;
        }
    }

    private recursiveCreateSubtask(task: any, insideCall: boolean) {

        if (task == undefined || task == null) throw "recursiveCreateSubtask. task == undefined"

        try {

            if (insideCall == false) {
                task = this.findAndAppendSubTask(task);
            }

            if (task == undefined || task == null) {
                return null;
            }


            if (ArrayValidation.validate(task["subTask"])) {

                for (let i = 0; i < task["subTask"].length; i++) {

                    task["subTask"][i] = this.findAndAppendSubTask(task["subTask"][i].toObject());
                    this.recursiveCreateSubtask(task["subTask"][i], true);
                }
            }

            return task;
        } catch (error) {

            throw error;
        }
    }
}