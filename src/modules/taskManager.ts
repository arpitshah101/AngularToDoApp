import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';

import { ITaskModel, TaskModel } from '../models/task';

export class TaskManager {

    private static db = mongoose.connection;

    public static addTask(name: string) {
        // console.log(this.db.readyState);
        console.log(`Adding new task`);
        const task = new TaskModel(<ITaskModel>{
            task: name,
            priority: 1,
            deadline: new Date()
        });
        task.save().then(
            (value) => console.log(value),
            err => console.error(err)
        );
    }

    public static getAll(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            TaskModel.find().then(
                (res: ITaskModel[]) => resolve(res),
                (reason: any) => console.error(reason)
            );
        });
    }

}
