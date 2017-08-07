import * as Promise from 'bluebird';
import { Request, Response, Router } from 'express';

import { UserManager } from '../modules';
import { verifyAuthentication } from './common-util';

const router = Router();

router.get('/', verifyAuthentication, (req: Request, res: Response, next: () => void) => {
    UserManager.getAllUsers()
        .then(users => {
            res.json(users.map(value => value.username));
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        })
        .finally(next);
});

router.post('/', verifyAuthentication, (req: Request, res: Response, next: () => void) => {
    // validation
    const username: string = req.body.username;
    const password: string = req.body.password;
    const email: string = req.body.email;
    if (!(username && password && email)) {
        // not all info provided
        res.status(400);
        res.send('Insufficient information to create a new user.');
        next();
    } else {
        UserManager.addUser(username, password, email)
            .then(user => {
                res.status(201);
                res.json(user);
            })
            .catch(err => {
                res.status(500);
                res.send(err);
            })
            .finally(next);
    }
});

export const UserRoutes = router;
