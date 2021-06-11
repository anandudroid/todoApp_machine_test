import * as mongoose from 'mongoose';
import { ITask } from '../interfaces/itask';


export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED'
}

var taskSchema = new mongoose.Schema({

    taskId: { type: String, max: 100, required: true, unique: false },
    name: { type: String, max: 100, required: true, unique: false },
    tree: [{ type: String, required: false, unique: false }], //String array 
    parentId: { type: String, max: 100, required: false, unique: false },
    completionDate: { type: Date, required: false, unique: false },
    isDeleted: { type: Boolean, required: true, default: false },
    taskStatus: {type: TaskStatus, require: true, default: TaskStatus.PENDING }

},
    { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

const TaskMongoModel = mongoose.model<ITask & mongoose.Document>('task_table', taskSchema);

export { TaskMongoModel };



