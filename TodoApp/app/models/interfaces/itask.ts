import { TaskStatus } from "../mongo_models/mongomodel";
import { IModel } from "./imodel";


export interface ITask extends IModel {

  id: string;
  taskId: string;
  name: string;
  tree: string[];
  parentId: string;
  completionDate: string | Date;
  taskStatus: string | TaskStatus;
}

