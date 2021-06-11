import { ITaskIONode } from '../../models/interfaces/itask.node';
import { NotFoundException } from '../../response/exceptions/defaults/5.notfound.exception';
import { IResponse } from '../../response/responss';
import { InternalServerErrorException } from '../../response/exceptions/defaults/23.internal_server_error.exception';
import { TaskIONodeDTO } from '../../responseDTOs/task.node';

export class TaskNodeDTOBuilder {

    public static build(data: Object): Promise<ITaskIONode> {

        return new Promise((resolve, reject) => {

         //   ILogger.log("CatogoryNodeDTOBuilder.build", JSON.stringify(data));

            if (data == undefined || data == null) {

                reject(IResponse.Exception(new NotFoundException().append("TaskNodeDTOBuilder.build. data == undefined ")))
                return;
            }

            if (data["task"] == undefined || data["task"] == null) {

                reject(IResponse.Exception(new NotFoundException().append("TaskNodeDTOBuilder.build. data.task == undefined ")))
                return;
            }

            try {

                let catogoryIONodeDTO = new TaskIONodeDTO(data["task"]);
                resolve(catogoryIONodeDTO);
            } catch (error) {

                reject(IResponse.Exception(new InternalServerErrorException().append(error)));
            }
        })
    }
}