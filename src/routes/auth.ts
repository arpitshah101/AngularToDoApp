import * as Promise from 'bluebird';
import { Request, Response, Router } from 'express';
import * as jwt from 'jsonwebtoken';

import { UserManager } from '../modules';

import { config } from '../config';

const router = Router();

router.post('/login', (req: Request, res: Response, next: () => void) => {
    res.clearCookie('_token');
    const username: string = req.body.username;
    const password: string = req.body.password;
    if (!(username && password)) {
        res.status(400);
        res.send('Insufficient information to authenticate the user.');
        next();
    } else {
        UserManager.checkPassword(username, password)
            .then((valid: boolean) => {
                if (valid) {
                    const token = jwt.sign({ 'username': username }, config.secret, {
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
