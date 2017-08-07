import * as Promise from 'bluebird';
import { Request, Response, Router } from 'express';

import * as jwt from 'jsonwebtoken';

import { config } from '../config';

export function verifyAuthentication(req: Request, res: Response, next: () => void) {
    const authCookie = req.signedCookies._token;
    if (!authCookie) {
        res.sendStatus(401);
    } else {
        Promise.promisify(jwt.verify)(authCookie, config.secret)
            .then(() => next())
            .catch((err) => {
                res.clearCookie('_token');
                res.sendStatus(401);
            });
    }
}
