export interface ITaskNode {

    name: string;
    taskId: string;
    parentId: string;
    subTask: ITaskNode[];
    completionDate: string | Date;
    taskStatus: string;
}

export interface ITaskIONode {
    task :ITaskNode[]
}