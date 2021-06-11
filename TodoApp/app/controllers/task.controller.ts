import { Request, Response } from 'express';
import { IResponse } from '../response/responss';
import { IController } from './icontroller';
import { ILogger } from '../ilogger';
import { NotFoundException } from '../response/exceptions/defaults/5.notfound.exception';
import { IResult } from '../response/result';
import { PromiseChain } from '../components/promise_chain';
import { ITask } from '../models/interfaces/itask';
import { TaskToJsonBuilder } from '../components/buiders/task_to_joson.builder';
import { TaskRespository as TaskRespository } from '../repository/task.respository';
import { MongoErrorBilder } from '../components/buiders/mongo.error.builder';
import { TaskNodeDTOBuilder } from '../components/buiders/task_node_dto.builder';
import { IResponseOK } from '../response/response_ok';
import { InputValidations } from '../components/input_validations';
import { TaskRequestModelBuilder } from '../components/buiders/task.request.model.builder';
import { TaskDTO } from '../responseDTOs/task.dto';
import { PreConditionFailedException } from '../response/exceptions/defaults/13.precondition_failed.exception';
import { TaskStatus } from '../models/mongo_models/mongomodel';

export class TaskController extends IController {

    constructor() {
        super();
    }

    public createTask(req: Request, res: Response) {

        let requestModel: ITask = req.body;
        let parentTask: ITask = null;

        PromiseChain.newChain()
        .then(result => {
            return InputValidations.validateField("name", requestModel.name);
        })
        .then(result => {
            if(requestModel.parentId == null || requestModel.parentId == undefined) { return null }
            return InputValidations.validateField("parentId", requestModel.parentId);
        })
        .then(result => {

            if(result == null){ return null; }
           
            return TaskController._getTaskById(requestModel.parentId)
        })
        .then(task_ => {

            parentTask = task_
            return new TaskRequestModelBuilder(requestModel, parentTask).build()
        })
        .then(task_ => {

            return new Promise<ITask>((resolve, reject) => {

                TaskRespository.create(task_).then(savedModel => {

                    if (savedModel == null || savedModel == undefined ) {

                        reject(IResponse.Exception(new NotFoundException().append("task")));
                        return;
                    }
                    resolve(new TaskDTO(savedModel));
                }).catch(err => {

                    reject(IResponse.Exception(new MongoErrorBilder(JSON.stringify(err)).getError()));
                });
            });
        })
        .then(result => {
            res.send(IResponse.Result(new IResult(result)))
        })
        .catch(error => {
            res.send(error);
        })

    }

    public getAll(req: Request, res: Response) {

        PromiseChain.newChain()
            // Get All Tasks from Storage
            .then(r => {
                return new Promise<ITask[]>((resolve, reject) => {

                    TaskRespository.getAllTasks().then(savedModel => {

                        if (savedModel == null || savedModel == undefined) {

                            ILogger.log("TaskController.getAll.taskRespository", "(savedModel == null)");
                            resolve(new Array<ITask>());
                            return;
                        }
                    
                        resolve(savedModel);
                    }).catch(err => {

                        reject(IResponse.Exception(new MongoErrorBilder(JSON.stringify(err)).getError()));
                    });
                })
            })
            .then((savedModel: ITask[]) => {

                return new TaskToJsonBuilder(savedModel).build();
            })
            .then(data => {

                return TaskNodeDTOBuilder.build(data);
            })
            .then(result => {

                res.send(IResponse.Result(new IResult(result)));
            })
            .catch(err => {

                ILogger.log("TaskController.getAllTasksAsJson.catch", err);
                res.send(err);
            });
    }


    public deleteTask(req: Request, res: Response) {

        let taskId = null;
        let task: ITask = {} as ITask;

        PromiseChain.newChain()
            .then(r => {
                return InputValidations.validateRequestParam(req, "id");
            })
            .then(id => {
                taskId = id;
              
                return TaskController._getTaskById(taskId)
            })
            .then(task_ => {
                task = task_;

                return new Promise<ITask[]>((resolve, reject) => {

                    if(task.taskStatus == TaskStatus.IN_PROGRESS) {
                        reject(IResponse.Exception(new PreConditionFailedException().append("task is in inprogress status")));
                        return;
                    }

                    TaskRespository.getByParentTaskIdAndInprogresStatus(taskId).then(savedModel => {

                        if (savedModel == null || savedModel == undefined || savedModel.length == 0) {

                            resolve(null);
                            return;
                        }
                       
                       reject(IResponse.Exception(new PreConditionFailedException().append("task tree contains chiled task with inprogress status")))

                    }).catch(err => {

                        reject(IResponse.Exception(new MongoErrorBilder(JSON.stringify(err)).getError()));
                    });
                });
            })
            .then(task_ => {

                return new Promise<ITask[]>((resolve, reject) => {

                    TaskRespository.getByParentTaskId(taskId).then(savedModel => {

                        if (savedModel == null || savedModel == undefined || savedModel.length == 0) {

                            resolve(null);
                            return;
                        }
                        resolve((savedModel));
                    }).catch(err => {

                        reject(IResponse.Exception(new MongoErrorBilder(JSON.stringify(err)).getError()));
                    });
                });
            })
            .then(childTaskss_ => {
              
                let tasks = []
               
                if (childTaskss_ != null) { 
                    tasks = childTaskss_;
                }

                tasks.unshift(task);
                
                return new Promise((resolve, reject) => {

                    TaskRespository.deleteMultipleTasks(tasks).then(savedModel => {

                        if (savedModel == null || savedModel == undefined) {

                            reject(IResponse.Exception(new NotFoundException().append("tasks")));
                            return;
                        }
                        resolve(IResponse.Result(new IResult(new IResponseOK())));
                    }).catch(err => {

                        reject(IResponse.Exception(new MongoErrorBilder(JSON.stringify(err)).getError()));
                    });
                });
            })
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.send(err);
            });
    }

    private static _getTaskById(id: string) {

        return new Promise<ITask>((resolve, reject) => {

            TaskRespository.getByTaskId(id).then(savedModel => {

                if (savedModel == null || savedModel == undefined) {

                    reject(IResponse.Exception(new NotFoundException().append("task")));
                    return;
                }

                resolve((savedModel));
            }).catch(err => {

                reject(IResponse.Exception(new MongoErrorBilder(JSON.stringify(err)).getError()));
            });
        });
    }

}

