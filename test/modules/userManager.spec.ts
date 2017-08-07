import * as chai from 'chai';
import 'mocha';

import * as bluebird from 'bluebird';

import * as mongoose from 'mongoose';
(<any>mongoose).Promise = bluebird;

import { UserManager } from '../../src/modules/userManager';
import { IUserModel, UserModel } from '../../src/models/user';
describe('AuthManager', () => {

    before((done) => {
        mongoose.connect('mongodb://localhost/todo-app-test');
        const tempUser = new UserModel({
            username: 'arpit',
            password: 'test',
            email: 'test@test.com',
        });
        tempUser.save(done);
    });

    after((done) => {
        mongoose.connection.dropDatabase(done);
    });

    describe('getAllUsers', () => {
        it('should get all users', (done) => {
            UserManager.getAllUsers()
                .then(results => {
                    chai.assert.isAtLeast(results.length, 1, 'Could not find any users in the collection');
                })
                .finally(done);
        });
    });

    describe('addUser', () => {
        it('should add new user with {test, test, test}', (done) => {
            UserManager.addUser('test', 'test', 'test')
                .then((user: IUserModel) => {
                    chai.assert.instanceOf(user, UserModel);
                })
                .catch(err => err)
                .finally(done);
        });

        it('should throw a rejection with {test, test, undfined}', (done) => {
            UserManager.addUser('test', 'test', undefined)
                .then(user => {
                    chai.assert(false, 'Adding a user without all information should fail');
                })
                .catch((err: Error) => {
                    chai.assert.equal(err.message, 'Username, password, and email must all be provided to create new user');
                })
                .finally(done);
        });
    })

    describe('checkPassword', () => {
        it('should return true if password matches', (done) => {
            // check if password matches with user from addUser test
            UserManager.checkPassword('test', 'test')
                .catch(err => {
                    done(err);
                })
                .then(result => {
                    chai.assert(result, 'Result should be true from checkPassword()');
                    done();
                });
        });
    });

    describe('removeUser', () => {
        it('should remove user if one exists', (done) => {
            UserManager.removeUser('test')
                .then(() => UserModel.findOne({ username: 'test' }))
                .then(user => {
                    chai.assert.equal(user, null, `No user should be found for the given username anymore`);
                    done();
                })
                .catch(err => done(err));
        });

        it('should return null if user doesn\'t exist', (done) => {
            UserManager.removeUser('bob')
                .then(removedUser => {
                    chai.assert.equal(removedUser, null);
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });

});
