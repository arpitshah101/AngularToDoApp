import * as Promise from 'bluebird';
import { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';

import { AuthManager } from '../modules';

const router = Router();

router.get('/users', (req: Request, res: Response, next: () => void) => {
    AuthManager.getAllUsers()
        .then(users => {
            res.json(users.map(value => value.username));
        })
        .catch(err => {
            res.status(500);
            res.send(err);
        })
        .finally(next);
});

router.post('/users', (req: Request, res: Response, next: () => void) => {
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
        AuthManager.addUser(username, password, email)
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

router.post('/login', (req: Request, res: Response, next: () => void) => {
    res.clearCookie('_token');
    const username: string = req.body.username;
    const password: string = req.body.password;
    if (!(username && password)) {
        res.status(400);
        res.send('Insufficient information to authenticate the user.');
        next();
    } else {
        AuthManager.checkPassword(username, password)
            .then((valid: boolean) => {
                if (valid) {
                    const token = jwt.sign({ 'username': username }, 'test', {
                        algorithm: 'HS256',
                        expiresIn: '30d',
                    });
                    res.cookie('_token', token, {
                        signed: true,
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                } else {
                    res.sendStatus(401);
                }
            })
            .then(() => {
                if (!res.headersSent) {
                    res.sendStatus(200);
                }
                next();
            });
    }
});

router.post('/logout', (req: Request, res: Response, next: () => void) => {
    res.clearCookie('_token');
    res.sendStatus(200);
    next();
});

export const AuthRoutes = router;
