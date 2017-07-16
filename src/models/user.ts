import * as mongoose from 'mongoose';

export interface IUserModel extends mongoose.Document {
    username: string;
    password: string;
    email: string;
}

const schema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
}, { skipVersioning: true });

export const UserModel = mongoose.model<IUserModel>('User', schema);
