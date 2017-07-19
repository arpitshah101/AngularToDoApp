import * as Promise from 'bluebird';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUserModel, UserModel } from '../models';

const saltRounds = 10;

export class UserManager {

    private static db = mongoose.connection;

    public static addUser(username: string, password: string, email: string): Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            if (!(username && password && email)) {
                reject(new Error('Username, password, and email must all be provided to create new user'));
            }
            bcrypt.hash(password, saltRounds)
                .catch(err => reject)
                .then(encryptedPassword => {
                    const user = new UserModel(<IUserModel>{
                        email,
                        username,
                        password: encryptedPassword,
                    });
                    user.save()
                        .then(resolve, reject);
                });
        });
    }

    public static checkPassword(username: string, password: string): Promise<boolean> {
        return UserModel
            .findOne({ username })
            .then(user => bcrypt.compare(password, user.password));
    }

    public static getAllUsers(): Promise<IUserModel[]> {
        return new Promise<IUserModel[]>((resolve, reject) => {
            UserModel.find().then(resolve, reject);
        });
    }

    public static removeUser(username: string): Promise<IUserModel> {
        return new Promise<IUserModel>((resolve, reject) => {
            UserModel.findOneAndRemove({ username }).then(resolve, reject);
        });
    }

}
