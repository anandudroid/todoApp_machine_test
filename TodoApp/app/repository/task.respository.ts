import { TaskMongoModel, TaskStatus } from "../models/mongo_models/mongomodel";
import { ITask } from '../models/interfaces/itask';
import { ObjectUtils } from "../components/object.utils";

export class TaskRespository {

    public static create(item: ITask) {
        return new TaskMongoModel(item).save();
    }

    public static update(item: ITask) {
        return TaskMongoModel.findByIdAndUpdate(item.id, item, { new: true });
    }

    public static getByParentTaskIdAndInprogresStatus(taskId: string) {
        return TaskMongoModel.find({ "tree": { $in: [taskId] }, "isDeleted": false, taskStatus: TaskStatus.IN_PROGRESS });
    }

    public static getByParentTaskId(taskId: string) {
        return TaskMongoModel.find({ "tree": { $in: [taskId] }, "isDeleted": false });
    }

    public static getAll() {
        return TaskMongoModel.find({"isDeleted": false });
    }

    public static getById(id: string) {
        return TaskMongoModel.findById(id);
    }

    public static getByTaskId(id: string) {
        return TaskRespository.getOne("taskId", id);
    }

    public static getByParentId(id: string) {
        return TaskRespository.getBy("parentId", id);
    }

    public static getBy(key: string, value: any) {
        return TaskMongoModel.find({ [key]: value, "isDeleted": false });
    }

    public static getOne(key: string, value: any) {
        return TaskMongoModel.findOne({ [key]: value, "isDeleted":  false });
    }

    public static deleteBy(key: string, value: any) {
        return TaskMongoModel.findOneAndDelete({ [key]: value, "isDeleted": true })
    }

    public static getAllTasks() {   
        return TaskMongoModel.find({isDeleted: false});
    }


    public static deleteById(id: String) {
        return this.deleteBy("_id", id);
    }

    public static deleteAll() {
        return TaskMongoModel.updateMany({}, {isDeleted: true});
    }

    private static getIn(key: string, value: any) {
        return TaskMongoModel.find({ [key]: { $in: value }, "isDeleted":  {$in:[null, false]}});
    }

    public static deleteMultipleTasks(tasks: ITask[]) {
      

        let bulkDelete = TaskMongoModel.collection.initializeUnorderedBulkOp();

        tasks.map(item => {

            let query = {};
            query["taskId"] = item.taskId;
            
            bulkDelete.find(ObjectUtils.clone(query)).update({ $set: { "isDeleted": true} })
        })

        return bulkDelete.execute();
    }

}

