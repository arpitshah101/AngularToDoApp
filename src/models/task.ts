import * as mongoose from 'mongoose';

export interface ITaskModel extends mongoose.Document {
    task: string,
    priority: number,
    deadline: Date
}

const schema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    priority: mongoose.Schema.Types.Number,
    deadline: mongoose.Schema.Types.Date
});

export const TaskModel = mongoose.model<ITaskModel>('Task', schema);
