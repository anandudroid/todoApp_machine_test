import { ITaskIONode, ITaskNode } from '../models/interfaces/itask.node';

export class TaskNodeDTO implements ITaskNode {

    name: string;
    taskId: string;
    parentId: string;
    subTask: ITaskNode[];
    completionDate: string | Date;
    taskStatus: string;

    constructor(node: ITaskNode) {

        if (node == null) throw 'node == undefined';

        if (node.name == null) throw 'node.name == undefined';

        this.name = node.name

        if (node.taskId == null) throw 'node.id == undefined';

        this.taskId = node.taskId
        this.taskStatus = node.taskStatus;

        if (node.subTask != undefined && node.subTask != null) {

            let array = new Array<ITaskNode>();

            node.subTask.forEach(element => {

                try {
                    let child = new TaskNodeDTO(element);
                    array.push(child);
                } catch (error) {

                }

                this.subTask = array;
            });
        }
    }

}

export class TaskIONodeDTO implements ITaskIONode {

    task: ITaskNode[] = new Array<ITaskNode>();

    constructor(task: ITaskNode[]) {

        for (var i = 0; i < task.length; i++) {

            try {
                let taskNodeDTO = new TaskNodeDTO(task[i]);

                this.task.push(taskNodeDTO);
            } catch (error) {
                throw error
            }
        }
    }

}


